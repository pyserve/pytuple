from common.views import BaseModelViewset
from customer import models, serializers
from rest_framework import permissions


class CustomerViewset(BaseModelViewset):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerSerializer
    permission_classes = [permissions.AllowAny]
