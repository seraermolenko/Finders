# Generated by Django 5.1.1 on 2024-09-30 22:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='minor',
            field=models.CharField(blank=True, max_length=30),
        ),
    ]
