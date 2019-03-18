from django.urls import re_path, include
from allauth.account.views import ConfirmEmailView

urlpatterns = [
    re_path(r'^', include('rest_auth.urls')),
    re_path(r'^registration/account-confirm-email/(?P<key>[-:\w]+)/$',
            ConfirmEmailView.as_view(template_name='account_activation_email.html'), name='account_confirm_email'),
    re_path(r'^registration/', include('rest_auth.registration.urls')),

]