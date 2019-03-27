from rest_framework import serializers

from .models import Notification


class NotificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Notification
        fields = ('id', 'title', 'content', 'user', 'notify_on', 'sent', 'date_created', 'last_modified')
