import json
import os

import aiohttp
import requests
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth import get_user_model

OLLAMA_URL = os.environ.get("OLLAMA_URL", "http://localhost:11434")

User = get_user_model()


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        if self.scope["user"].is_anonymous:
            await self.close()
            return

        self.user = self.scope["user"]
        self.room_group_name = f"chat_{self.user.id}"
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        message_type = data.get("type")

        if message_type == "chat_message":
            message = data["content"]
            message_id = data["message_id"]

            await self.channel_layer.group_send(
                self.room_group_name,
                {"type": "chat_message", "message": message, "message_id": message_id},
            )

    async def chat_message(self, event):
        message = event["message"]
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    f"{OLLAMA_URL}/api/generate",
                    json={
                        "model": "gemma3:1b",
                        "prompt": message,
                        "stream": True,
                    },
                    timeout=30,
                ) as resp:
                    async for line in resp.content:
                        token_data = json.loads(line.decode("utf-8"))
                        if not token_data.get("done", False):
                            token = token_data.get("response", "")
                            await self.send(
                                text_data=json.dumps(
                                    {
                                        "type": "stream_token",
                                        "token": token,
                                        "message_id": event.get("message_id", ""),
                                    }
                                )
                            )

            await self.send(
                text_data=json.dumps(
                    {
                        "type": "stream_end",
                        "message_id": event.get("message_id", ""),
                    }
                )
            )

        except Exception as e:
            await self.send(
                text_data=json.dumps(
                    {
                        "type": "stream_error",
                        "error": str(e),
                        "message_id": event.get("message_id", ""),
                    }
                )
            )
