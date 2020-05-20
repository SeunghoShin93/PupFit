from django.db import models
from django.contrib.auth.models import AbstractUser


class Breed(models.Model):
    name = models.CharField(max_length=50)
    name_en = models.CharField(max_length=50)
    origin = models.CharField(max_length=50)
    group = models.CharField(max_length=50)
    min_height = models.FloatField()
    max_height = models.FloatField()
    min_weight = models.FloatField()
    max_weight = models.FloatField()

class Dog(models.Model):
    breed = models.ForeignKey(to=Breed, on_delete=models.PROTECT)
    device = models.IntegerField()
    name = models.CharField(max_length=50)
    profile = models.ImageField()
    birthyear = models.IntegerField()

class User(AbstractUser):
    email = models.EmailField(
        max_length=255,
        unique=True
    )
    dogs = models.ManyToManyField(to=Dog)