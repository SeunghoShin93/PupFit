from time import time
from datetime import date, timedelta
import jwt
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Dog, Breed
from health.models import DogInfo, WalkingActive
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
    today = date.today()
    _7daysago = today - timedelta(days=7)
    info = DogInfo.objects.filter(date__gt=_7daysago, date__lte=today)

    breed = serializers.CharField(source='breed.name')
    weights = serializers.SerializerMethodField()
    snack_cnts = serializers.SerializerMethodField()
    distances = serializers.SerializerMethodField()

    class Meta:
        model = Dog
        fields = '__all__'
        include = ['info']

    def create(self, validated_data):
        return Dog.objects.create(**validated_data)

    def get_weights(self, instance):
        info = self.info.filter(dog=instance)
        return [i.weight for i in info]
    
    def get_snack_cnts(self, instance):
        info = self.info.filter(dog=instance)
        return [i.snack_cnt for i in info]

    def get_distances(self, instance):
        distances = []
        for d in range(7):
            _daysago = self.today - timedelta(days=d)
            walks = WalkingActive.objects.filter(
                walking_start__dog=instance,
                walking_start__datetime__startswith=_daysago
            )
            distances.append(sum([walk.distance for walk in walks]))
        return distances