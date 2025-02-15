# Generated by Django 3.0.6 on 2020-06-08 21:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_dog_height'),
    ]

    operations = [
        migrations.CreateModel(
            name='Food',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=20)),
                ('name', models.CharField(max_length=100)),
                ('img', models.CharField(max_length=300, null=True)),
                ('protein', models.FloatField(null=True)),
                ('fat', models.FloatField(null=True)),
                ('ash', models.FloatField(null=True)),
                ('fiber', models.FloatField(null=True)),
                ('moist', models.FloatField(null=True)),
                ('phosphorus', models.FloatField(null=True)),
                ('calcium', models.FloatField(null=True)),
                ('calory', models.FloatField(null=True)),
            ],
        ),
        migrations.AddField(
            model_name='dog',
            name='goal_weight',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='dog',
            name='dog_food',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='accounts.Food'),
        ),
    ]
