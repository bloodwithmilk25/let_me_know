from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status

from .models import Notification
from .serializers import NotificationSerializer


class NotificationsListView(generics.ListAPIView):
    """
    GET Notifications/
    POST Notifications/
    """
    serializer_class = NotificationSerializer

    def get_queryset(self):
        user = self.request.user
        return user.notifications.all()

    def post(self, request, *args, **kwargs):
        serializer = NotificationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NotificationDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET Notifications/:id/
    PUT Notifications/:id/
    DELETE Notifications/:id/
    """
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    def get(self, request, *args, **kwargs):
        try:
            notification = self.queryset.get(pk=kwargs["pk"])
            return Response(NotificationSerializer(notification).data)
        except Notification.DoesNotExist:
            return Response(
                data={
                    "message": "Notification with id: {} does not exist".format(kwargs["pk"])
                },
                status=status.HTTP_404_NOT_FOUND
            )

    def put(self, request, *args, **kwargs):
        try:
            notification = self.queryset.get(pk=kwargs["pk"])
            serializer = NotificationSerializer()
            updated_Notification = serializer.update(notification, request.data)
            return Response(NotificationSerializer(updated_Notification).data)
        except Notification.DoesNotExist:
            return Response(
                data={
                    "message": "Notification with id: {} does not exist".format(kwargs["pk"])
                },
                status=status.HTTP_404_NOT_FOUND
            )

    def delete(self, request, *args, **kwargs):
        try:
            notification = self.queryset.get(pk=kwargs["pk"])
            notification.delete()
            return Response(data={"message": "Notification with id: {} was deleted".format(kwargs["pk"])},
                            status=status.HTTP_204_NO_CONTENT)
        except Notification.DoesNotExist:
            return Response(
                data={
                    "message": "Notification with id: {} does not exist".format(kwargs["pk"])
                },
                status=status.HTTP_404_NOT_FOUND
            )