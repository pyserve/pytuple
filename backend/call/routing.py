from django.urls import path

from call import consumers

call_websocket_urlpatterns = [
    path("ws/audiostream/", consumers.AudioStreamConsumer.as_asgi()),
]
