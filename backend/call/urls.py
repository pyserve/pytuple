from django.urls import path
from rest_framework.routers import DefaultRouter

from call import views

router = DefaultRouter()
router.register("calls", views.CallViewset)
