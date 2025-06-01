import os

import requests
from common.views import BaseModelViewset
from dotenv import load_dotenv
from machinelearning import models, serializers
from machinelearning.pipeline import rag_pipeline
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.response import Response

load_dotenv()
OLLAMA_URL = os.environ.get("OLLAMA_URL", "http://localhost:11434")


class UserUploadedFileViewset(BaseModelViewset):
    queryset = models.UserUploadedFile.objects.all()
    serializer_class = serializers.UserUploadedFileSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser, JSONParser)


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

        context_results = rag_pipeline.retrieve(user_query)
        contexts = [res["content"] for res in context_results]
        prompt = f"""
            Context: {''.join(contexts)}
            Question: {user_query}
            Answer:
        """

        response = requests.post(
            f"{OLLAMA_URL}/api/generate",
            json={
                "model": "gemma3:1b",
                "prompt": prompt,
                "stream": False,
            },
            timeout=30,
        )
        if response.status_code == 200:
            data = response.json()
            data["rag_contexts"] = [
                {
                    "content": res["content"],
                    "source": res["metadata"].get("source", "unknown"),
                    "score": res["score"],
                }
                for res in context_results
            ]
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": "LLM service unavailable"},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )
