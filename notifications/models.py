from django.db import models
from django.contrib.auth import get_user_model


class Notification(models.Model):
    title = models.CharField(max_length=50)
    content = models.TextField()
    user = models.ForeignKey(get_user_model(), related_name='notifications', on_delete=models.CASCADE)
    notify_on = models.DateTimeField()
    date_created = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)