from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status

from .models import Notification
from .serializers import NotificationSerializer
from .permissions import IsOwner


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
            # check if user creating notification for himself  # maybe deprecated later
            new_ntfc_user_id = serializer.validated_data['user'].id
            if new_ntfc_user_id == self.request.user.id:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NotificationDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET Notifications/:id/
    PUT Notifications/:id/
    PATCH Notifications/:id/
    DELETE Notifications/:id/
    """
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = (IsOwner,)

    def put_patch(self, request, *args, **kwargs):
        serializer = NotificationSerializer(data=request.data)
        if serializer.is_valid():
            # check if user creating notification for himself  # maybe deprecated later
            new_ntfc_user_id = serializer.validated_data['user'].id
            if new_ntfc_user_id == self.request.user.id:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
        return self.put_patch(request, *args, **kwargs)

    def p(self, request, *args, **kwargs):
        return self.put_patch(request, *args, **kwargs)
