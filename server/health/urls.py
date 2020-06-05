from django.urls import path
from . import views

urlpatterns = [
    path('<int:device_id>/rasp/', views.rasp),
    path('<int:device_id>/walking/', views.walking_active),
]