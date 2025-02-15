from django.db import models
from accounts.models import *

class DogInfo(models.Model):
    dog = models.ForeignKey(to=Dog, on_delete=models.CASCADE)
    date = models.DateField(auto_now=True)
    weight = models.FloatField(null=True)
    snack_cnt = models.IntegerField(null=True)

class WalkingStart(models.Model):
    dog = models.ForeignKey(Dog, on_delete=models.CASCADE)
    datetime = models.DateTimeField()

class WalkingActive(models.Model):
    walking_start = models.ForeignKey(WalkingStart, on_delete=models.CASCADE)
    small = models.IntegerField(default=0)
    big = models.IntegerField(default=0)
    distance = models.FloatField(default=0)
    gps = models.TextField()


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