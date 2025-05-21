from accounts import models
from common.admin import BaseModelAdmin
from django.contrib import admin

admin.site.register(models.User, BaseModelAdmin)
admin.site.register(models.Role, BaseModelAdmin)
