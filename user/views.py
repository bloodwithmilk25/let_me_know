from django.shortcuts import redirect
from allauth.account.views import ConfirmEmailView


class CustomConfirmEmailView(ConfirmEmailView):
    def post(self, *args, **kwargs):
        self.object = confirmation = self.get_object()
        user = confirmation.email_address.user
        user.is_verified = True
        user.save()
        confirmation.confirm(self.request)
        super().post(*args, **kwargs)
        return redirect('/')
