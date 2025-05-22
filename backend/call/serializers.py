from call import models
from lead.serializers import LeadSerializer
from rest_framework.serializers import ModelSerializer


class CallSerializer(ModelSerializer):
    lead = LeadSerializer(read_only=True)

    class Meta:
        model = models.Call
        fields = "__all__"
