from call import models, serializers
from rest_framework import permissions, viewsets


class CallViewset(viewsets.ModelViewSet):
    queryset = models.Call.objects.all()
    serializer_class = serializers.CallSerializer
    permission_classes = [permissions.IsAuthenticated]
