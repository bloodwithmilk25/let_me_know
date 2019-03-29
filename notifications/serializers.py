from rest_framework import serializers

from .models import Notification


class NotificationSerializer(serializers.ModelSerializer):

    notify_on = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = Notification
        fields = ('id', 'title', 'content', 'user', 'notify_on', 'sent', 'date_created', 'last_modified')
