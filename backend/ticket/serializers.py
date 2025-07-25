from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from ticket import models


class TicketSerializer(ModelSerializer):
    class Meta:
        model = models.Ticket
        fields = "__all__"
