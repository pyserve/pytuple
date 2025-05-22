from lead import models, serializers
from rest_framework import permissions, viewsets


class LeadViewset(viewsets.ModelViewSet):
    queryset = models.Lead.objects.all()
    serializer_class = serializers.LeadSerializer
    permission_classes = [permissions.IsAuthenticated]
