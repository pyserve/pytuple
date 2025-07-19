import base64
import json
import os

import httpx
import requests
from channels.generic.websocket import AsyncWebsocketConsumer
from dotenv import load_dotenv

load_dotenv()
OLLAMA_URL = os.environ.get("OLLAMA_URL", "http://localhost:11434")

SILENCE_THRESHOLD_MS = 1000
CHUNK_SIZE_MS = 1000


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

            if event == "start":
                print("Stream started")

            elif event == "media":
                payload = data["media"]["payload"]
                audio_bytes = base64.b64decode(payload)
                transcript = await self.process_audio(audio_bytes)
                print("AI Agent Response:", transcript)

            elif event == "stop":
                print("Stream stopped")

    async def process_audio(self, audio_bytes):
        try:
            with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
                tmp.write(audio_bytes)
                tmp_path = tmp.name
            async with httpx.AsyncClient(timeout=30) as client:
                response = await client.post(
                    f"{OLLAMA_URL}/api/generate",
                    files={"file": audio_file},
                    data={
                        "model": "dimavz/whisper-tiny",
                        "prompt": "",  # Whisper doesn't need prompt
                        "stream": "false",
                    },
                )
                response.raise_for_status()
                return response.json()
        except httpx.HTTPError as e:
            return f"HTTP Error: {str(e)}"
        except json.JSONDecodeError:
            return "Error decoding Ollama response"
        except Exception as e:
            return f"Unexpected error: {str(e)}"
        finally:
            if tmp_path and os.path.exists(tmp_path):
                os.unlink(tmp_path)
