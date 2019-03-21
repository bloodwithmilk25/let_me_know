from django.contrib import admin
from django.urls import re_path, include
from django.views.generic import TemplateView

urlpatterns = [
    re_path('admin/', admin.site.urls),
    re_path(r'api/auth/', include('user.urls')),
    re_path(r'api/notifications/', include('notifications.urls')),
    # this view is here because we need pass uid and token to frontend in order to reset password
    re_path(r'password-reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
            TemplateView.as_view(template_name='index.html'), name='password_reset_confirm'),
    re_path('^', TemplateView.as_view(template_name='index.html'), name='home'),
]
