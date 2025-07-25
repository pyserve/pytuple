from accounts.models import User
from customer.models import Customer
from django.db import models
from django.utils import timezone


class Ticket(models.Model):
    STATUS_CHOICES = [
        ("open", "Open"),
        ("in_progress", "In Progress"),
        ("closed", "Closed"),
    ]

    PRIORITY_CHOICES = [
        ("low", "Low"),
        ("medium", "Medium"),
        ("high", "High"),
        ("urgent", "Urgent"),
    ]

    customer = models.ForeignKey(
        Customer, on_delete=models.CASCADE, related_name="ticket_customer"
    )
    subject = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="open")
    priority = models.CharField(
        max_length=20, choices=PRIORITY_CHOICES, default="medium"
    )
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    assigned_to = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="user_tickets", null=True
    )

    def __str__(self):
        return f"Ticket #{self.id} - {self.subject}"
        return f"Ticket #{self.id} - {self.subject}"
