from time import time
from datetime import date, timedelta
import jwt
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Dog, Breed
from health.models import DogInfo
from health.serializers import DogInfoSerializers

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


class PayloadSerializers(serializers.Serializer):
    now = int(time())
    userId = serializers.IntegerField(source='pk')
    username = serializers.CharField()
    iat = serializers.IntegerField(default=now)
    exp = serializers.IntegerField(default=now + 7200000)
    
class BreedSerializers(serializers.ModelSerializer):
    class Meta:
        model = Breed
        fields = '__all__'

class DogDetailSerializers(serializers.ModelSerializer):
    info = serializers.SerializerMethodField()

    class Meta:
        model = Dog
        fields = '__all__'
        include = ['info']

    def create(self, validated_data):
        return Dog.objects.create(**validated_data)

    def get_info(self, instance):
        today = date.today()
        _7daysago = today - timedelta(days=7)
        info = DogInfo.objects.filter(dog=instance, date__gt=_7daysago, date__lte=today)
        return DogInfoSerializers(info, many=True).data