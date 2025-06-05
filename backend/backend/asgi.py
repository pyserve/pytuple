import os

from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django_asgi_app = get_asgi_application()

from call.routing import call_websocket_urlpatterns
from common.middleware import TokenAuthMiddleware
from machinelearning.routing import websocket_urlpatterns

urlpatterns = call_websocket_urlpatterns + websocket_urlpatterns

application = ProtocolTypeRouter(
    {
        "http": django_asgi_app,
        "websocket": TokenAuthMiddleware(URLRouter(urlpatterns)),
    }
)
