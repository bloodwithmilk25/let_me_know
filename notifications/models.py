from django.db import models
from django.db.models import signals
from django.contrib.auth import get_user_model
from .tasks import send_notification


class Notification(models.Model):
    title = models.CharField(max_length=50, blank=True)
    content = models.TextField(blank=True)
    user = models.ForeignKey(get_user_model(), related_name='notifications', on_delete=models.CASCADE)
    notify_on = models.DateTimeField()
    date_created = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title if self.title else self.content[:20]


def notification_post_save(instance, *args, **kwargs):
    send_notification.apply_async((instance,), eta=instance.notify_on)


signals.post_save.connect(notification_post_save, sender=Notification)
