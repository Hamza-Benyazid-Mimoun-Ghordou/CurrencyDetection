from django.urls import path, include
from rest_framework import routers
from predict.views import predictionViewSet


router = routers.DefaultRouter()
router.register('predict', predictionViewSet)

urlpatterns = [
    path('', include(router.urls))
]
