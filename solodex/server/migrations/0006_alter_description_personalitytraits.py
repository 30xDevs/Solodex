# Generated by Django 5.1.5 on 2025-01-28 03:16

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0005_alter_person_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='description',
            name='personalityTraits',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='server.personalitytraits'),
        ),
    ]
