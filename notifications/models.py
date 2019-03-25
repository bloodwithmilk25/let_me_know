from django.db import models
from django.db.models import signals
from django.contrib.auth import get_user_model
from user_api.celery import app


class Notification(models.Model):
    title = models.CharField(max_length=50, blank=True)
    content = models.TextField(blank=True)
    user = models.ForeignKey(get_user_model(), related_name='notifications', on_delete=models.CASCADE)
    celery_task_id = models.CharField(max_length=100, blank=True)
    notify_on = models.DateTimeField()

    date_created = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    sent = models.BooleanField(default=False)
    # TODO add notify_on validation

    def __str__(self):
        return self.title if self.title else self.content[:20]

    def save(self, *args, **kwargs):
        """
        For newly created notification we create a task and set that task's id to "create_task_id"
        For updates we check whether notify_on was changed. If it was, we discard initial task
        and create new one.
        """
        # handle initial creation
        try:
            pre_notify_on = Notification.objects.get(pk=self.id).notify_on
        except Notification.DoesNotExist:
            pass

        super().save(*args, **kwargs)
        post_notify_on = self.notify_on

        from .tasks import send_notification
        if not self.celery_task_id:  # initial task creation
            task_object = send_notification.apply_async((self.id,), eta=self.notify_on)
            Notification.objects.filter(pk=self.id).update(celery_task_id=task_object.id)

        # "notify_on" updated case
        elif pre_notify_on != post_notify_on:
            # discard the old task
            app.control.revoke(self.celery_task_id, terminate=True)
            # create new
            task_object = send_notification.apply_async((self.id,), eta=self.notify_on)
            Notification.objects.filter(pk=self.id).update(celery_task_id=task_object.id)


def delete_task(instance, *args, **kwargs):
    app.control.revoke(instance.celery_task_id, terminate=True)


signals.post_delete.connect(delete_task, sender=Notification)
