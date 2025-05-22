from accounts.urls import router as account_routers
from accounts.views import GoogleLogin
from call.urls import router as call_routers
from django.contrib import admin
from django.urls import include, path
from lead.urls import router as lead_routers
from rest_framework.authtoken import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.registry.extend(account_routers.registry)
router.registry.extend(call_routers.registry)
router.registry.extend(lead_routers.registry)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("accounts/", include("allauth.urls")),
    path("dj-rest-auth/", include("dj_rest_auth.urls")),
    path("dj-rest-auth/registration/", include("dj_rest_auth.registration.urls")),
    path("dj-rest-auth/google/", GoogleLogin.as_view(), name="google_login"),
    path("auth/token/", views.obtain_auth_token),
    path("", include(router.urls)),
]
