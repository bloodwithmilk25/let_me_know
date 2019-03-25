from rest_framework.serializers import ModelSerializer
from .models import Notification


class NotificationSerializer(ModelSerializer):
    class Meta:
        model = Notification
        fields = ('id', 'title', 'content', 'user', 'notify_on', 'sent', 'date_created', 'last_modified')
