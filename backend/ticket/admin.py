from common.admin import BaseModelAdmin
from django.contrib import admin
from ticket import models

admin.site.register(models.Ticket, BaseModelAdmin)
