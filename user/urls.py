from django.urls import re_path, include
from allauth.account.views import ConfirmEmailView

urlpatterns = [
    re_path(r'^registration/account-confirm-email/(?P<key>[-:\w]+)/$', ConfirmEmailView.as_view(),
            name='account_confirm_email'),
    re_path(r'^registration/', include('rest_auth.registration.urls')),
    re_path(r'^accounts/', include('allauth.urls')),
    re_path(r'^', include('rest_auth.urls')),
]
