from django.db import models
from django.dispatch import receiver
from allauth.account.signals import email_confirmed
from django.core.mail import send_mail
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser

from .managers import UserManager


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


# set is_verified to True on my User model when confirming email with allauth view
# when email is confirmed trough allauth view, it sends a signal called email_confirmed
# then we receive it and do some work
@receiver(email_confirmed)
def email_confirmed_(email_address, **kwargs):
    User.objects.filter(email=email_address.email).update(is_verified=True)

