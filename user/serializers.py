from rest_auth.serializers import UserDetailsSerializer, LoginSerializer, TokenSerializer
from rest_auth.registration.serializers import RegisterSerializer
from rest_auth.models import TokenModel
from rest_framework import serializers

from .models import User


# Following serializers needed to change the behavior of rest_auth forms i.e.
# to delete some fields
class CustomLoginSerializer(LoginSerializer):
    def get_fields(self):
        fields = super().get_fields()
        del fields['username']
        return fields


class CustomRegisterSerializer(RegisterSerializer):
    def get_fields(self):
        fields = super().get_fields()
        del fields['username']
        return fields


class CustomUserDetailsSerializer(UserDetailsSerializer):
    # date_of_birth = serializers.DateField(input_formats=["%b %d, %Y"])  # Apr 05, 2019

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'date_of_birth',
                  'date_joined', 'is_active', 'is_admin', 'is_verified')
        read_only_fields = ('is_admin', 'id', 'date_joined', 'is_verified', 'is_active')


class CustomTokenSerializer(TokenSerializer):
    """
    Customizing token serializer too return not only token, but user instance too
    on login.
    """
    user = CustomUserDetailsSerializer(many=False, read_only=True)

    class Meta:
        model = TokenModel
        fields = ('key', 'user')
