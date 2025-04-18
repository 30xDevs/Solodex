# Generated by Django 5.1.5 on 2025-01-28 01:21

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0002_alter_person_gender'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person',
            name='description',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='server.description'),
        ),
        migrations.AlterField(
            model_name='person',
            name='relationships',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='server.relationships'),
        ),
    ]
