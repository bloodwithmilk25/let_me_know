from django.shortcuts import redirect
from allauth.account.views import ConfirmEmailView
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView


class CustomConfirmEmailView(ConfirmEmailView):
    def post(self, *args, **kwargs):
        self.object = confirmation = self.get_object()
        user = confirmation.email_address.user
        user.is_verified = True
        user.save()
        confirmation.confirm(self.request)
        super().post(*args, **kwargs)
        return redirect('/')


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter
