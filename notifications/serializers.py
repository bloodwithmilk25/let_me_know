from rest_framework import serializers

from .models import Notification


class NotificationSerializer(serializers.ModelSerializer):
    notify_on = serializers.DateTimeField(format="%b %d, %Y %H:%M")  # Apr 05, 2019 2:23

    class Meta:
        model = Notification
        fields = ('id', 'title', 'content', 'user', 'notify_on', 'sent', 'date_created', 'last_modified')
