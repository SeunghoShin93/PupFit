from rest_framework import serializers
from .models import *

class DogInfoSerializers(serializers.ModelSerializer):
    class Meta:
        model = DogInfo
        fields = '__all__'

class ActivitySerializers(serializers.ModelSerializer):
    # datetime = serializers.DateTimeField()
    class Meta:
        model = Activity
        fields = '__all__'


class GpsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Gps
        fields = '__all__'


class WalkingStartSerializers(serializers.ModelSerializer):
    class Meta:
        model = WalkingStart
        fields = '__all__'

class WalkingActiveSerializers(serializers.ModelSerializer):
    class Meta:
        model = WalkingActive
        fields = '__all__'

class WalkingEndSerializers(serializers.ModelSerializer):
    class Meta:
        model = WalkingEnd
        fields = '__all__'