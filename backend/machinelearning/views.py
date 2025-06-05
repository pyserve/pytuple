import os

import requests
from dotenv import load_dotenv
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.response import Response

from common.views import BaseModelViewset
from machinelearning import models, serializers

load_dotenv()
OLLAMA_URL = os.environ.get("OLLAMA_URL", "http://localhost:11434")


class UserUploadedFileViewset(BaseModelViewset):
    queryset = models.UserUploadedFile.objects.all()
    serializer_class = serializers.UserUploadedFileSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def create(self, request, *args, **kwargs):
        files = request.FILES.getlist("files")

        if not files:
            return Response(
                {"error": "No files uploaded."}, status=status.HTTP_400_BAD_REQUEST
            )

        instances = []
        for file in files:
            serializer = self.get_serializer(
                data={"file": file, "user": request.user.id}
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
            instances.append(serializer.data)

        return Response(instances, status=status.HTTP_201_CREATED)


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


class QueryViewset(viewsets.ViewSet):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def list(self, request):
        return Response({"request": []})

    @action(detail=False, methods=["post"], url_path="chat")
    def chat(self, request):
        user_query = request.data.get("query")
        if not user_query:
            return Response(
                {"error": "No query provided."}, status=status.HTTP_400_BAD_REQUEST
            )

        response = requests.post(
            f"{OLLAMA_URL}/api/generate",
            json={
                "model": "gemma3:1b",
                "prompt": user_query,
                "stream": False,
            },
            timeout=30,
        )
        if response.status_code == 200:
            data = response.json()
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": "LLM service unavailable"},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )
