import os

from call import models, serializers
from common.views import BaseModelViewset
from django.http import HttpResponse
from dotenv import load_dotenv
from rest_framework import permissions
from rest_framework.decorators import action
from twilio.twiml.voice_response import Connect, Say, Stream, VoiceResponse

load_dotenv()


class CallViewset(BaseModelViewset):
    queryset = models.Call.objects.all()
    serializer_class = serializers.CallSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=["POST"], url_path="inbound")
    def inbound(self, request):
        response = VoiceResponse()
        connect = Connect()
        connect.stream(url=f"wss://{os.getenv("NGROK_DOMAIN")}/ws/audiostream/")
        response.append(connect)
        response.say(
            "This TwiML instruction is unreachable unless the Stream is ended by your WebSocket server."
        )
        return HttpResponse(str(response), content_type="text/xml")
