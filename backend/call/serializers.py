from call import models
from lead.models import Lead
from lead.serializers import LeadSerializer
from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField


class CallSerializer(ModelSerializer):
    lead = LeadSerializer(read_only=True)
    lead_id = PrimaryKeyRelatedField(
        queryset=Lead.objects.all(), source="lead", write_only=True
    )

    class Meta:
        model = models.Call
        fields = "__all__"
