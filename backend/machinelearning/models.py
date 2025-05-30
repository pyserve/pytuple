import uuid

from django.conf import settings
from django.db import models


class UserUploadedFile(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="uploaded_files",
        help_text="The user who uploaded this file.",
    )
    name = models.CharField(max_length=255, null=True, blank=True)
    file = models.FileField(
        upload_to="uploads/files/",
        help_text="The user-uploaded file for model training.",
    )

    description = models.TextField(
        blank=True,
        null=True,
        help_text="A brief description of the file and its purpose for training.",
    )

    uploaded_at = models.DateTimeField(
        auto_now_add=True, help_text="The date and time when the file was uploaded."
    )

    file_type = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        help_text="The type of the file (e.g., CSV, JSON, Image, Text).",
    )

    file_size = models.BigIntegerField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.file_type and self.file:
            extension = self.file.name.split(".")[-1].lower()
            if extension in ["csv", "json", "txt", "jpeg", "jpg", "png", "gif", "zip"]:
                self.file_type = extension
            else:
                self.file_type = "other"
            self.name = self.file.name
            self.file_size = self.file.size
        super().save(*args, **kwargs)


class APICredential(models.Model):
    PROVIDER_CHOICES = [
        ("Google Gemini", "Google Gemini"),
        ("OpenAI", "OpenAI"),
        ("Meta LLama", "Meta LLama"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="api_keys",
        help_text="The user associated with this API key.",
    )

    key = models.CharField(
        max_length=255,
        unique=True,
        help_text="A unique key provided by the API service provider.",
    )

    provider = models.CharField(
        max_length=100,
        choices=PROVIDER_CHOICES,
        help_text="The name of the API provider (e.g., 'Google', 'OpenAI').",
    )

    created_at = models.DateTimeField(
        auto_now_add=True, help_text="The date and time when the API key was created."
    )

    expires_at = models.DateTimeField(
        blank=True,
        null=True,
        help_text="Optional: The date and time when the API key expires.",
    )

    status = models.CharField(
        max_length=20,
        choices=[
            ("active", "Active"),
            ("inactive", "Inactive"),
            ("revoked", "Revoked"),
        ],
        default="active",
        help_text="The current status of the API key.",
    )

    class Meta:
        ordering = ["-created_at"]
        unique_together = (("user", "provider"),)


class AIModel(models.Model):
    MODEL_TYPE_CHOICES = [
        ("classification", "Classification"),
        ("regression", "Regression"),
        ("nlp_generation", "Natural Language Generation"),
        ("other", "Other"),
    ]

    TRAINING_STATUS_CHOICES = [
        ("pending", "Pending"),
        ("in_progress", "In Progress"),
        ("completed", "Completed"),
        ("failed", "Failed"),
        ("cancelled", "Cancelled"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="custom_models",
    )

    job_id = models.UUIDField(
        default=uuid.uuid4,
        unique=True,
        editable=False,
    )

    api_key = models.ForeignKey(
        APICredential,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="model_configurations",
    )

    name = models.CharField(
        max_length=200,
    )

    description = models.TextField(
        blank=True,
        null=True,
    )

    training_data = models.ForeignKey(
        UserUploadedFile,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="model_configurations",
    )

    model_type = models.CharField(
        max_length=50,
        choices=MODEL_TYPE_CHOICES,
    )

    training_parameters = models.JSONField(
        default=dict,
        help_text="JSON field for training parameters (e.g., epochs, learning_rate, model_arch).",
    )

    evaluation_metrics_target = models.JSONField(
        default=dict,
        blank=True,
        null=True,
        help_text="JSON field for target evaluation metrics (e.g., {'accuracy': 0.9}).",
    )

    status = models.CharField(
        max_length=20,
        choices=TRAINING_STATUS_CHOICES,
        default="pending",
    )

    trained_model_artifact = models.FileField(
        upload_to="trained_models/",
        blank=True,
        null=True,
    )

    training_results = models.JSONField(
        default=dict,
        blank=True,
        null=True,
        help_text="JSON field for training results and evaluation scores.",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    started_at = models.DateTimeField(
        blank=True,
        null=True,
    )

    completed_at = models.DateTimeField(
        blank=True,
        null=True,
    )
