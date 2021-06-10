from rest_framework.serializers import ModelSerializer
from predict.models import prediction

class predictionSerializer(ModelSerializer):
    class Meta:
        model = prediction
        fields = ['predict', ]