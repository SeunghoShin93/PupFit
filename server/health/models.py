from django.db import models
from accounts.models import *

# Create your models here.

class DogInfo(models.Model):
    dog = models.ForeignKey(to=Dog, on_delete=models.CASCADE)
    date = models.DateField(auto_now=True)
    weight = models.FloatField(null=True)
    height = models.FloatField(null=True)