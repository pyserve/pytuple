from common.admin import BaseModelAdmin
from django.contrib import admin
from machinelearning import models

admin.site.register(models.UserUploadedFile, BaseModelAdmin)
admin.site.register(models.APICredential, BaseModelAdmin)
admin.site.register(models.AIModel, BaseModelAdmin)
