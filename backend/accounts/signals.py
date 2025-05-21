from accounts import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


@receiver(post_save, sender=models.User)
def create_token(sender, instance, created, **kwargs):
    if created:
        Token.objects.create(user=instance)
