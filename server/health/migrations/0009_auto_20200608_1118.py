# Generated by Django 3.0.6 on 2020-06-08 11:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('health', '0008_merge_20200608_0305'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='doginfo',
            name='walk_distance',
        ),
        migrations.AlterField(
            model_name='doginfo',
            name='snack_cnt',
            field=models.IntegerField(null=True),
        ),
    ]
