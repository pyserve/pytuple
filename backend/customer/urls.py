from customer import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("customers", views.CustomerViewset)
