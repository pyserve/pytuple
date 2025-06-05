import base64
import json

from channels.generic.websocket import AsyncWebsocketConsumer


class AudioStreamConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        print("WebSocket connected")

    async def disconnect(self, close_code):
        print("WebSocket disconnected")

    async def receive(self, text_data=None, bytes_data=None):
        if text_data:
            data = json.loads(text_data)
            event = data.get("event")
            print(data)

            if event == "start":
                print("Stream started")
            elif event == "media":
                payload = data["media"]["payload"]
                audio_bytes = base64.b64decode(payload)
                transcript = await self.process_audio(audio_bytes)
                print("AI Agent Response:", transcript)

                await self.send(
                    text_data=json.dumps({"type": "transcript", "data": transcript})
                )
            elif event == "stop":
                print("Stream stopped")

    async def process_audio(self, audio_bytes):
        # Placeholder: integrate your ASR or AI agent here
        return "Transcribed text from audio chunk"
