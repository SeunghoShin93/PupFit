# Generated by Django 3.0.6 on 2020-05-20 13:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Breed',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('name_en', models.CharField(max_length=50)),
                ('minheight', models.FloatField()),
                ('maxheight', models.FloatField()),
                ('minweight', models.FloatField()),
                ('maxweight', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Dog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('device', models.IntegerField()),
                ('name', models.CharField(max_length=50)),
                ('profile', models.ImageField(upload_to='')),
                ('birthyear', models.IntegerField()),
                ('breed', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='accounts.Breed')),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='dogs',
            field=models.ManyToManyField(to='accounts.Dog'),
        ),
    ]
