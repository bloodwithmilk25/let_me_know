from django.contrib import admin
from django.urls import path, re_path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'api/auth', include('user.urls')),
    re_path(r'api/notifications/', include('notifications.urls'))
]
