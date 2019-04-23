from django.db import models
from django.db.models import signals
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from letmeknow.celery import app
from datetime import datetime, timezone


def in_future(value):
    current_time = datetime.now(tz=timezone.utc)
    if value < current_time:
        raise ValidationError('notify_on cannot be in the past.')


class Notification(models.Model):
    title = models.CharField(max_length=50, blank=True)
    content = models.TextField(blank=True)
    user = models.ForeignKey(get_user_model(), related_name='notifications', on_delete=models.CASCADE)
    notify_on = models.DateTimeField(validators=[in_future])
    celery_task_id = models.CharField(max_length=100, blank=True)

    date_created = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    sent = models.BooleanField(default=False, editable=False)

    class Meta:
        ordering = ['-date_created']

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
