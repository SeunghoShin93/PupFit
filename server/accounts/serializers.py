from time import time
import jwt
from django.contrib.auth import get_user_model
from rest_framework import serializers


class SignUpserializers(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = [
            'email', 'username', 'password'
            ]
        required = ['email', 'username', 'password']
            

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = '__all__'
        # fields = [
        #     'username', 'date_joined', 'email', 'profile_image',
        #     'country', 'gender', 'age', 'like_perfumes'
        #     ]
        # read_only_fields = ['date_joined', 'email']


class PayloadSerializers(serializers.Serializer):
    now = int(time())
    userId = serializers.CharField(source='pk')
    username = serializers.CharField()
    iat = serializers.IntegerField(default=now)
    exp = serializers.IntegerField(default=now + 7200000)