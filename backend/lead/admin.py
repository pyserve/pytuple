from common.admin import BaseModelAdmin
from django.contrib import admin
from lead import models

admin.site.register(models.Lead, BaseModelAdmin)
