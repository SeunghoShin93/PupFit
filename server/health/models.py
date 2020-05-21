from django.db import models
from accounts.models import *

# Create your models here.

class DogInfo(models.Model):
    dog = models.ForeignKey(to=Dog, on_delete=models.PROTECT)
    date = models.DateField(auto_now=True)
    weight = models.FloatField()
    height = models.FloatField()