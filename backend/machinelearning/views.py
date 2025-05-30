import os

from common.views import BaseModelViewset
from dotenv import load_dotenv
from machinelearning import models, serializers
from machinelearning.pipeline import RAGPipeline
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.response import Response

load_dotenv()


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
    def list(self, request):
        return Response({"request": []})

    @action(detail=False, methods=["post"], url_path="query")
    def query(self, request):
        user_query = request.data.get("query")
        if not user_query:
            return Response({"error": "No query provided."}, status=400)

        user_id = request.user.id
        collection_name = f"user_{user_id}_collection"
        hf_token = os.getenv("HUGGINGFACE_TOKEN")
        try:
            rag_pipeline = RAGPipeline(
                hf_token=hf_token, collection_name=collection_name
            )
            answer = rag_pipeline.answer_query(user_query)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

        return Response({"answer": answer})
