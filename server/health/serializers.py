from rest_framework import serializers
from .models import *

class DogInfoSerializers(serializers.ModelSerializer):
    class Meta:
        model = DogInfo
        fields = '__all__'

class ActivitySerializers(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'


class GpsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Gps
        fields = '__all__'