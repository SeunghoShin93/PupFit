from django.urls import path
from . import views
from .views import SingleUser, SingleDog

urlpatterns = [
    path('login/', views.login),
    path('exists/email/<str:email>/', views.check_duplicate_email),
    path('user/', SingleUser.as_view()),
    path('device/', views.register_device),
    path('dog/', views.register_dog),
    path('dog/<int:dog_pk>/', SingleDog.as_view()),
]