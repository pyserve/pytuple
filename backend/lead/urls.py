from lead import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("leads", views.LeadViewset)
