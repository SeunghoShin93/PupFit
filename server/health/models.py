from django.db import models
from accounts.models import *

# Create your models here.

class DogInfo(models.Model):
    dog = models.ForeignKey(to=Dog, on_delete=models.CASCADE)
    date = models.DateField(auto_now=True)
    weight = models.FloatField(null=True)
    height = models.FloatField(null=True)

class Food(models.Model):
    category = models.CharField(max_length=20)
    name = models.CharField(max_length=100)
    img = models.CharField(null=True, max_length=300)
    protein = models.FloatField(null=True)
    fat = models.FloatField(null=True)
    ash = models.FloatField(null=True)
    fiber = models.FloatField(null=True)
    moist = models.FloatField(null=True)
    phosphorus = models.FloatField(null=True)
    calcium = models.FloatField(null=True)
    calory = models.FloatField(null=True)


class WalkingStart(models.Model):
    device = models.ForeignKey(Device, on_delete=models.CASCADE)
    datetime = models.DateTimeField()

class WalkingActive(models.Model):
    walking_start = models.ForeignKey(WalkingStart, on_delete=models.CASCADE)
    kind = models.IntegerField()

class WalkingEnd(models.Model):
    walking_start = models.ForeignKey(WalkingStart, on_delete=models.CASCADE)
    datetime = models.DateTimeField()

class Activity(models.Model):
    device = models.ForeignKey(Device, on_delete=models.CASCADE)
    level = models.IntegerField() ## 0,1,2
    datetime = models.DateTimeField()

class Gps(models.Model):
    device = models.ForeignKey(Device, on_delete=models.CASCADE)
    datetime = models.DateTimeField()
    lat = models.FloatField()
    lon = models.FloatField()