from call import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("calls", views.CallViewset)
