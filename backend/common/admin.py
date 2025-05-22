from django.contrib import admin
from django.db.models.fields.related import ForeignObjectRel


class BaseModelAdmin(admin.ModelAdmin):
    def get_list_display(self, request):
        fields = [
            field.name
            for field in self.model._meta.get_fields()
            if not isinstance(field, ForeignObjectRel) and field.name != "password"
        ]
        fields = sorted(fields)
        if "id" in fields:
            fields.remove("id")
            fields.insert(0, "id")
        return fields
