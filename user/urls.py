from django.urls import re_path, include
from .views import CustomConfirmEmailView, FacebookLogin
from rest_auth.registration.views import (
    SocialAccountListView, SocialAccountDisconnectView
)

urlpatterns = [
    re_path(r'^', include('rest_auth.urls')),
    re_path(r'^registration/account-confirm-email/(?P<key>[-:\w]+)/$', CustomConfirmEmailView.as_view(),
        name='account_confirm_email'),
    re_path(r'^registration/$', include('rest_auth.registration.urls')),
    re_path(r'^facebook/$', FacebookLogin.as_view(), name='fb_login')
]

urlpatterns += [
    re_path(
        r'^socialaccounts/$',
        SocialAccountListView.as_view(),
        name='social_account_list'
    ),
    re_path(
        r'^socialaccounts/(?P<pk>\d+)/disconnect/$',
        SocialAccountDisconnectView.as_view(),
        name='social_account_disconnect'
    )
]