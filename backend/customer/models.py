from django.db import models


class Customer(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    first_name = models.CharField(max_length=255, null=True)
    last_name = models.CharField(max_length=255)
    info = models.TextField(blank=True, null=True)
    dob = models.DateField(blank=True, null=True)
    mobile = models.CharField(max_length=13, blank=True, null=True)
    phone = models.CharField(max_length=13, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    address = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        ordering = ["name"]

    def save(self, *args, **kwargs):
        self.name = self.first_name + " " + self.last_name
        super().save(*args, **kwargs)
