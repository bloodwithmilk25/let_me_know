from django.urls import re_path
from .views import NotificationsListView, NotificationDetailView

urlpatterns = [
    re_path('/', NotificationsListView.as_view(), name="todo_all"),
    re_path(r'(?P<pk>\d+)/$', NotificationDetailView.as_view(), name="todo_detail")
]