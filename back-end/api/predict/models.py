from django.db import models
import numpy as np
from tensorflow.keras.preprocessing import image
import tensorflow as tf
from rest_framework.response import Response
from rest_framework import status
import os

CLASSES = ["10 dh","100 dh","20 dh","200 dh","5 dh","50 dh"]
model_name = '/model_v1'
model_weight_name = '/model.weights.best.hdf5'
model = tf.keras.models.load_model("static/" + 'model' + model_name)
#model.load_weights(settings.STATIC_URL + 'model' + model_weight_name)

class prediction(models.Model):

    img = models.ImageField(null = False, upload_to="images/")

    def predict(self):
        input_size = (256, 256)
        path = self.img.name
        img = image.load_img(path, target_size = input_size) 
        x = image.img_to_array(img)/255
        x = np.expand_dims(x, axis=0)
        images = np.vstack([x])
        proba = model.predict(images, batch_size=10)
        predict_index = proba[0].argmax()
        max_proba = max(proba[0])
        if max_proba < 0.85:
            predict = "none"
        else:
            predict = CLASSES[predict_index]
        response = {
                    'result' : predict,
                    'probability': max_proba
                }
        os.remove(self.img.name)
        prediction.objects.all().delete()
        
        return Response(response, status=status.HTTP_200_OK)

