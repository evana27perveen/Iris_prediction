from django.urls import path
from . import views

app_name = 'App_main'

urlpatterns = [
    path('', views.home, name='home'),
    path('result/', views.result_api_view, name='result'),
    path('db-view/', views.db_view, name='db-view'),
]
