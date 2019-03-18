from django.conf.urls import url, include
from django.urls import re_path
from allauth.account.views import ConfirmEmailView
from . import views

urlpatterns = [
    # Override urls
    url(r'^registration/account-email-verification-sent/', views.null_view, name='account_email_verification_sent'),
    url(r'^registration/account-confirm-email/(?P<key>[-:\w]+)/$', ConfirmEmailView.as_view(), name='account_confirm_email'),
    url(r'^registration/complete/$', views.complete_view, name='account_confirm_complete'),
    re_path(r'^password/reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
            views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    # Default urls
    url(r'', include('rest_auth.urls')),
    url(r'^registration/', include('rest_auth.registration.urls'))
]