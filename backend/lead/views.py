from common.views import BaseModelViewset
from lead import models, serializers
from rest_framework import permissions


class LeadViewset(BaseModelViewset):
    queryset = models.Lead.objects.all()
    serializer_class = serializers.LeadSerializer
    permission_classes = [permissions.IsAuthenticated]
