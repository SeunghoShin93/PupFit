# Generated by Django 3.0.6 on 2020-06-07 18:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('health', '0006_auto_20200605_2235'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='walkingactive',
            name='count',
        ),
        migrations.RemoveField(
            model_name='walkingactive',
            name='kind',
        ),
        migrations.RemoveField(
            model_name='walkingend',
            name='distance',
        ),
        migrations.AddField(
            model_name='walkingactive',
            name='big',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='walkingactive',
            name='distance',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='walkingactive',
            name='gps',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='walkingactive',
            name='small',
            field=models.IntegerField(default=0),
        ),
    ]
