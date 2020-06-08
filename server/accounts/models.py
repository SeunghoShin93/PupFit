from django.db import models
from django.contrib.auth.models import AbstractUser

class Device(models.Model):
    id = models.IntegerField(primary_key=True, unique=True)

class Breed(models.Model):
    name = models.CharField(max_length=50)
    name_en = models.CharField(max_length=50)
    origin = models.CharField(max_length=50)
    group = models.CharField(max_length=50)
    min_height = models.FloatField()
    max_height = models.FloatField()
    min_weight = models.FloatField()
    max_weight = models.FloatField()

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

class Dog(models.Model):
    breed = models.ForeignKey(to=Breed, on_delete=models.PROTECT)
    device = models.OneToOneField(Device, on_delete=models.PROTECT)
    name = models.CharField(max_length=50)
    profile = models.ImageField(null=True)
    birthyear = models.IntegerField()
    gender = models.IntegerField(default=0)
    neutralization = models.BooleanField(default=False)
    pregnant = models.BooleanField(default=False)
    height = models.FloatField(null=True)
    dog_food = models.ForeignKey(Food, on_delete=models.SET_NULL, null=True)
    goal_weight = models.FloatField(null=True)


class User(AbstractUser):
    email = models.EmailField(
        max_length=255,
        unique=True
    )
    dogs = models.ManyToManyField(to=Dog, related_name='owners')
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']