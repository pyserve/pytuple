# Generated by Django 5.2.1 on 2025-05-28 01:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("machinelearning", "0003_alter_aimodel_model_type_alter_apicredential_key"),
    ]

    operations = [
        migrations.AddField(
            model_name="useruploadedfile",
            name="file_size",
            field=models.BigIntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="useruploadedfile",
            name="name",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
