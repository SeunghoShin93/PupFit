from rest_framework import serializers
from .models import *

class DogInfoSerializers(serializers.Serializer):
    date = serializers.DateField()
    weight = serializers.FloatField()
    snack_cnt = serializers.IntegerField()
    distance = serializers.SerializerMethodField()

    def get_distance(self, instance):
        walks = WalkingActive.objects.filter(
            walking_start__dog=instance.dog,
            walking_start__datetime__startswith=instance.date
        )
        return sum([walk.distance for walk in walks])

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