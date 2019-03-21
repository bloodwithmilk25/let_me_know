from django.shortcuts import redirect
from allauth.account.adapter import DefaultAccountAdapter
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter


class SocialAccountAdapter(DefaultSocialAccountAdapter):
    def save_user(self, request, sociallogin, form=None):
        u = sociallogin.user
        u.is_verified = True
        super().save_user(request, sociallogin, form)

    def get_connect_redirect_url(self, request, socialaccount):
        """
        Returns the default URL to redirect to after successfully
        connecting a social account.
        """
        assert request.user.is_authenticated
        return '/'


class AccountAdapter(DefaultAccountAdapter):
    def get_login_redirect_url(self, request):
        return '/'
