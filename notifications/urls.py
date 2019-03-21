from django.urls import re_path
from .views import NotificationsListView, NotificationDetailView

urlpatterns = [
    re_path(r'^(?P<pk>\d+)/$', NotificationDetailView.as_view(), name="notification_detail"),
    re_path(r'^$', NotificationsListView.as_view(), name="user_notifications"),
]
