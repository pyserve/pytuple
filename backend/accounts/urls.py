from accounts import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("users", views.UserViewset, basename="user")
router.register("roles", views.RoleViewset, basename="role")
