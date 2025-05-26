from common.views import BaseModelViewset
from machinelearning import models, serializers
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response


class UserUploadedFileViewset(BaseModelViewset):
    queryset = models.UserUploadedFile.objects.all()
    serializer_class = serializers.UserUploadedFileSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)


class APICredentialViewset(BaseModelViewset):
    queryset = models.APICredential.objects.all()
    serializer_class = serializers.APICredentialSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=["GET"])
    def get_providers(self, request, **kwargs):
        choices = [
            {"value": choice[0], "label": choice[1]}
            for choice in models.APICredential.PROVIDER_CHOICES
        ]
        return Response(choices, status=status.HTTP_200_OK)


class AIModelViewset(BaseModelViewset):
    queryset = models.AIModel.objects.all()
    serializer_class = serializers.AIModelSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=["GET"])
    def get_model_choices(self, request, **kwargs):
        choices = [
            {"value": choice[0], "label": choice[1]}
            for choice in models.AIModel.MODEL_TYPE_CHOICES
        ]
        return Response(choices, status=status.HTTP_200_OK)
