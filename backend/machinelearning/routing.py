from django.urls import path
from machinelearning import consumers

websocket_urlpatterns = [
    path("ws/chat/", consumers.ChatConsumer.as_asgi(), name="chatconsumer"),
]
