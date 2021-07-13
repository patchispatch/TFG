# Generated by Django 3.2.5 on 2021-07-12 17:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_settings'),
    ]

    operations = [
        migrations.AlterField(
            model_name='objective',
            name='best_streak',
            field=models.PositiveSmallIntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='objective',
            name='current_streak',
            field=models.PositiveSmallIntegerField(null=True),
        ),
    ]
