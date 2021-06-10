from rest_framework import viewsets
from rest_framework.exceptions import ParseError
from predict.models import prediction
from predict.serializers import predictionSerializer
from rest_framework.decorators import action


# Create your views here.
class predictionViewSet(viewsets.ModelViewSet):
    queryset = prediction.objects.all()
    serializer_class = predictionSerializer
    @action(methods=['POST'], detail=False)
    def predict(self, request):
        try:
            file = request.data['file']
        except KeyError:
            raise ParseError('Request has no resource file attached')
        predict = prediction.objects.create(img = file)
        return predict.predict()

