from lead import models
from rest_framework.serializers import ModelSerializer


class LeadSerializer(ModelSerializer):
    class Meta:
        model = models.Lead
        fields = "__all__"
