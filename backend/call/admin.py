from call import models
from common.admin import BaseModelAdmin
from django.contrib import admin

admin.site.register(models.Call, BaseModelAdmin)
