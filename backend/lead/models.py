from django.db import models


class Lead(models.Model):
    SOURCE_CHOICES = [
        ("website", "Website"),
        ("cold_call", "Cold Call"),
        ("referral", "Referral"),
        ("social_media", "Social Media"),
        ("ad_campaign", "Ad Campaign"),
        ("event", "Event"),
        ("other", "Other"),
    ]

    INTEREST_CHOICES = [
        ("ai_voice_bot", "AI Voice Bot"),
        ("appointment_booking", "Appointment Booking"),
        ("customer_support", "Customer Support"),
        ("ivr_system", "IVR System"),
        ("custom_solution", "Custom Solution"),
    ]

    STATUS_CHOICES = [
        ("new", "New"),
        ("contacted", "Contacted"),
        ("qualified", "Qualified"),
        ("converted", "Converted"),
        ("lost", "Lost"),
    ]

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    company = models.CharField(max_length=255, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    source = models.CharField(max_length=50, choices=SOURCE_CHOICES, default="website")
    interested_in = models.CharField(
        max_length=50, choices=INTEREST_CHOICES, blank=True, null=True
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="new")
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.email}"
