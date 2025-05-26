from machinelearning import models
from machinelearning.models import UserUploadedFile
from rest_framework import serializers


class UserUploadedFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserUploadedFile
        fields = "__all__"


class APICredentialSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.APICredential
        fields = "__all__"


class AIModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.AIModel
        fields = "__all__"
