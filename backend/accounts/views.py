from accounts import models, serializers
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from common.views import BaseModelViewset
from dj_rest_auth.registration.views import SocialLoginView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions
from rest_framework.filters import OrderingFilter, SearchFilter


class UserViewset(BaseModelViewset):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["id", "username", "email"]
    search_fields = ["email", "username"]


class RoleViewset(BaseModelViewset):
    queryset = models.Role.objects.all()
    serializer_class = serializers.RoleSerializer
    permission_classes = [permissions.IsAuthenticated]
    permission_classes = [permissions.IsAuthenticated]


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
