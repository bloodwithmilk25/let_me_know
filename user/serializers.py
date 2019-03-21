from rest_auth.serializers import UserDetailsSerializer, LoginSerializer
from rest_auth.registration.serializers import RegisterSerializer
from .models import User


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
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'date_of_birth',
                  'date_joined', 'is_active', 'is_admin', 'is_verified')
        read_only_fields = ('is_admin', 'id', 'date_joined')
