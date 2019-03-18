from rest_auth.serializers import UserDetailsSerializer, LoginSerializer
from rest_auth.registration.serializers import RegisterSerializer
from .models import User


class CustomLoginSerializer(LoginSerializer):
        def get_fields(self):
            fields = super(LoginSerializer, self).get_fields()
            del fields['username']
            return fields


# class CustomRegisterSerializer(RegisterSerializer):
#     class Meta:
#         model = User
#         fields = ('email', 'password1', 'password2')


class CustomUserDetailsSerializer(UserDetailsSerializer):
    class Meta:
        model = User
        fields = ('pk', 'email', 'first_name', 'last_name', 'date_of_birth',
                  'date_joined', 'is_active', 'is_admin', 'is_verified')
