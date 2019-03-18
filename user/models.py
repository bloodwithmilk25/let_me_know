from django.db import models
from django.db.models import signals
from django.core.mail import send_mail
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.template.loader import render_to_string

from .managers import UserManager
from .tokens import account_activation_token


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField('email address', unique=True)
    first_name = models.CharField('first name', max_length=30, blank=True)
    last_name = models.CharField('last name', max_length=30, blank=True)

    date_of_birth = models.DateField('date of birth', blank=True, null=True)
    date_joined = models.DateTimeField('date joined', auto_now_add=True)

    is_active = models.BooleanField('active', default=True)
    is_admin = models.BooleanField(default=False)
    is_verified = models.BooleanField('verified', default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    def full_name(self):
        """
        Returns the first_name plus the last_name, with a space in between.
        """
        full_name = f'{self.first_name} {self.last_name}'
        return full_name.strip()

    def short_name(self):
        """
        Returns the short name for the user.
        """
        return f'{self.first_name} {self.last_name[0]}'

    def email_user(self, subject, message, from_email=None, **kwargs):
        """
        Sends an email to this User.
        """
        send_mail(subject, message, from_email, [self.email], **kwargs)

    @property
    def is_staff(self):
        return self.is_admin


def user_post_save(instance, created, *args, **kwargs):
    # if it's a newly created but not verified user
    if created and not instance.is_verified:
        # Send verification email
        mail_subject = 'Activate your account.'
        message = render_to_string('account_activation_email.html', {
            'user': instance,
            'domain': 'http://localhost:8000',
            'uid': urlsafe_base64_encode(force_bytes(instance.pk)).decode(),
            'token': account_activation_token.make_token(instance),
        })
        instance.email_user(mail_subject, message)


signals.post_save.connect(user_post_save, sender=User)