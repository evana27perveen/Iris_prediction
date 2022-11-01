from rest_framework import serializers
from .models import Predictions


class PredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Predictions
        fields = '__all__'

