# Generated by Django 3.0.6 on 2020-06-08 09:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_auto_20200605_2235'),
    ]

    operations = [
        migrations.AddField(
            model_name='dog',
            name='height',
            field=models.FloatField(null=True),
        ),
    ]
