from customer import models
from rest_framework.serializers import ModelSerializer


class CustomerSerializer(ModelSerializer):
    class Meta:
        model = models.Customer
        fields = "__all__"
