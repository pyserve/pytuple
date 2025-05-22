from django.db import models


class Call(models.Model):
    CALL_TYPE_CHOICES = [
        ("incoming", "Incoming"),
        ("outgoing", "Outgoing"),
    ]

    CALL_STATUS_CHOICES = [
        ("scheduled", "Scheduled"),
        ("completed", "Completed"),
        ("missed", "Missed"),
        ("failed", "Failed"),
        ("no_answer", "No Answer"),
    ]

    lead = models.ForeignKey(
        "lead.Lead", on_delete=models.CASCADE, related_name="calls"
    )
    call_type = models.CharField(max_length=20, choices=CALL_TYPE_CHOICES)
    status = models.CharField(
        max_length=20, choices=CALL_STATUS_CHOICES, default="scheduled"
    )
    scheduled_time = models.DateTimeField(blank=True, null=True)
    start_time = models.DateTimeField(blank=True, null=True)
    end_time = models.DateTimeField(blank=True, null=True)
    duration_seconds = models.PositiveIntegerField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    recording_url = models.URLField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Call with {self.lead.first_name} {self.lead.last_name} - {self.status}"

    def save(self, *args, **kwargs):
        if self.start_time and self.end_time:
            duration = (self.end_time - self.start_time).total_seconds()
            self.duration_seconds = int(duration)
        super().save(*args, **kwargs)
