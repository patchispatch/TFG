# Generated by Django 3.2.5 on 2021-08-21 16:14

import core.models.category
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0013_alter_activity_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='color',
            field=models.CharField(default='default', max_length=32, validators=[core.models.category.validate_color]),
        ),
    ]
