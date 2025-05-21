from django.contrib import admin


class BaseModelAdmin(admin.ModelAdmin):
    def get_list_display(self, request):
        fields = [
            field.name
            for field in self.model._meta.get_fields()
            if field.name not in ["password"]
        ]
        fields = sorted(fields)
        if "id" in fields:
            fields.remove("id")
            fields.insert(0, "id")
        return fields
