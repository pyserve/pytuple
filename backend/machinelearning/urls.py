from machinelearning import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("uploaded_files", views.UserUploadedFileViewset)
router.register("api_credentials", views.APICredentialViewset)
router.register("models", views.AIModelViewset)
