from django.contrib.auth.models import (
    AbstractUser,
    BaseUserManager,
    Group,
    Permission,
    PermissionsMixin,
)
from django.db import models
from django.utils import timezone


class Role(models.Model):
    name = models.CharField(max_length=100, unique=True)
    permissions = models.ManyToManyField(
        Permission, blank=True, related_name="permission_roles"
    )
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    groups = models.ManyToManyField(Group, related_name="group_users", blank=True)
    user_permissions = models.ManyToManyField(
        Permission, related_name="permission_users", blank=True
    )
    roles = models.ManyToManyField(Role, related_name="role_users", blank=True)
    date_joined = models.DateTimeField(default=timezone.now)
    phone = models.CharField(max_length=15, blank=True, null=True)
    designation = models.CharField(max_length=100, blank=True, null=True)
    dob = models.DateField(blank=True, null=True)
    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    EXCLUDE_FIELDS = ["username"]

    def __str__(self):
        return self.email
