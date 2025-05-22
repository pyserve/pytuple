from call import models
from rest_framework.serializers import ModelSerializer


class CallSerializer(ModelSerializer):
    class Meta:
        model = models.Call
        fields = "__all__"
