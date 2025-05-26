from call import models, serializers
from common.views import BaseModelViewset
from rest_framework import permissions


class CallViewset(BaseModelViewset):
    queryset = models.Call.objects.all()
    serializer_class = serializers.CallSerializer
    permission_classes = [permissions.IsAuthenticated]
