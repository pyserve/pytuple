from accounts.urls import router as account_routers
from accounts.views import GoogleLogin
from call.urls import router as call_routers
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from lead.urls import router as lead_routers
from machinelearning.urls import router as aiml_routers
from rest_framework.authtoken import views
from rest_framework.routers import DefaultRouter
from django.views.decorators.csrf import csrf_exempt

router = DefaultRouter()
router.registry.extend(account_routers.registry)
router.registry.extend(call_routers.registry)
router.registry.extend(lead_routers.registry)
router.registry.extend(aiml_routers.registry)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("accounts/", include("allauth.urls")),
    path("dj-rest-auth/", include("dj_rest_auth.urls")),
    path("dj-rest-auth/registration/", include("dj_rest_auth.registration.urls")),
    path("dj-rest-auth/google/", GoogleLogin.as_view(), name="google_login"),
    path("auth/token/", csrf_exempt(obtain_auth_token)),
    path("", include(router.urls)),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
