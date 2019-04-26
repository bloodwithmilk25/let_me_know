from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

from .views import FrontendAppView

urlpatterns = [
    re_path('admin/', admin.site.urls),
    re_path(r'api/auth/', include('user.urls')),
    re_path(r'api/notifications/', include('notifications.urls')),
    # this view is here because we need pass uid and token to frontend in order to reset password
    re_path(r'password-reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
            TemplateView.as_view(template_name='../frontend/public/index.html'), name='password_reset_confirm'),
    re_path(r'^$', FrontendAppView.as_view()),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# django-debug-toolbar
if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
