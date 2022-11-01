from django.shortcuts import render
import pickle5 as pickle
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
import json

# Create your views here.
from .models import Predictions
from .serializers import PredictionSerializer


def home(request):
    with open('App_main/ai_models/iris_model.pickle', 'rb') as f:
        iris_model = pickle.load(f)
    content = {
    }
    if request.method == 'POST':
        sepal_length = float(request.POST.get('sepal_length'))
        sepal_width = float(request.POST.get('sepal_width'))
        petal_length = float(request.POST.get('petal_length'))
        petal_width = float(request.POST.get('petal_width'))

        predict = iris_model.predict([[sepal_length, sepal_width, petal_length, petal_width]])
        classification = predict[0]
        print(classification)

        db = Predictions(sepal_length=sepal_length, sepal_width=sepal_width, petal_length=petal_length,
                         petal_width=petal_width, classification=classification)
        db.save()
        content = {
            'classification': classification,
            'sepal_length': sepal_length,
            'sepal_width': sepal_width,
            'petal_length': petal_length,
            'petal_width': petal_width
        }
        return JsonResponse({'result': classification, 'sepal_length': sepal_length,
                             'sepal_width': sepal_width, 'petal_length': petal_length, 'petal_width': petal_width},
                            safe=False)

    return render(request, 'App_main/home.html', context=content)


@api_view(['POST'])
def result_api_view(request):
    with open('App_main/ai_models/iris_model.pickle', 'rb') as f:
        iris_model = pickle.load(f)
    content = {
    }
    if request.method == 'POST':
        sepal_length = float(request.data['sepal_length'])
        sepal_width = float(request.data['sepal_width'])
        petal_length = float(request.data['petal_length'])
        petal_width = float(request.data['petal_width'])

        predict = iris_model.predict([[sepal_length, sepal_width, petal_length, petal_width]])
        classification = predict[0]
        print(classification)

        # serializer = PredictionSerializer(data=request.data)
        # serializer.classification = classification
        # serializer.save()

        db = Predictions(sepal_length=sepal_length, sepal_width=sepal_width, petal_length=petal_length,
                         petal_width=petal_width, classification=classification)
        db.save()

        content = [{
            'classification': classification,
            'sepal_length': sepal_length,
            'sepal_width': sepal_width,
            'petal_length': petal_length,
            'petal_width': petal_width
        }]
        return Response(content)


@api_view(['GET'])
def db_view(request):
    results = Predictions.objects.all()
    serializer = PredictionSerializer(results, many=True)
    return Response(serializer.data)
