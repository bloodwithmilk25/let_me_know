from django.conf.urls import url, include
from .views import CustomConfirmEmailView, FacebookLogin
from rest_auth.registration.views import (
    SocialAccountListView, SocialAccountDisconnectView
)

urlpatterns = [
    url(r'^/', include('rest_auth.urls')),
    url(r'^registration/account-confirm-email/(?P<key>[-:\w]+)/$', CustomConfirmEmailView.as_view(),
        name='account_confirm_email'),
    url(r'^registration/', include('rest_auth.registration.urls')),
    url(r'^facebook/$', FacebookLogin.as_view(), name='fb_login')
]

urlpatterns += [
    url(
        r'^socialaccounts/$',
        SocialAccountListView.as_view(),
        name='social_account_list'
    ),
    url(
        r'^socialaccounts/(?P<pk>\d+)/disconnect/$',
        SocialAccountDisconnectView.as_view(),
        name='social_account_disconnect'
    )
]