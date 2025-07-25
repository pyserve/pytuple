# Generated by Django 5.2.1 on 2025-05-22 01:22

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("lead", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Call",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "call_type",
                    models.CharField(
                        choices=[("incoming", "Incoming"), ("outgoing", "Outgoing")],
                        max_length=20,
                    ),
                ),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("scheduled", "Scheduled"),
                            ("completed", "Completed"),
                            ("missed", "Missed"),
                            ("failed", "Failed"),
                            ("no_answer", "No Answer"),
                        ],
                        default="scheduled",
                        max_length=20,
                    ),
                ),
                ("scheduled_time", models.DateTimeField(blank=True, null=True)),
                ("start_time", models.DateTimeField(blank=True, null=True)),
                ("end_time", models.DateTimeField(blank=True, null=True)),
                (
                    "duration_seconds",
                    models.PositiveIntegerField(blank=True, null=True),
                ),
                ("notes", models.TextField(blank=True, null=True)),
                ("recording_url", models.URLField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "lead",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="calls",
                        to="lead.lead",
                    ),
                ),
            ],
            options={
                "ordering": ["-created_at"],
            },
        ),
    ]
