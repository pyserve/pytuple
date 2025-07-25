from common.admin import BaseModelAdmin
from customer import models
from django.contrib import admin

admin.site.register(models.Customer, BaseModelAdmin)
