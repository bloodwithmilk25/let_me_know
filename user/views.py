from django.http import HttpResponse
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.utils.encoding import force_text

from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_decode
from django.utils.http import urlsafe_base64_encode

from .models import User
from .tokens import account_activation_token


def verify(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_verified = True
        user.save()
        login(request, user)
        return HttpResponse('Activated')
    else:
        return HttpResponse('Activation link is invalid!')


@login_required
def resent_email(request):
    if request.method == 'GET':
        user = request.user
        print(user)
        mail_subject = 'Activate your account.'
        message = render_to_string('account_activation_email.html', {
            'user': user,
            'domain': 'http://localhost:8000',
            'uid': urlsafe_base64_encode(force_bytes(user.pk)).decode(),
            'token': account_activation_token.make_token(user),
        })
        user.email_user(mail_subject, message)
