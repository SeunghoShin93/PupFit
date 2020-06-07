from django.urls import path
from . import views
from .views import SingleUser

urlpatterns = [
    path('login/', views.login),
    path('exists/email/<str:email>/', views.check_duplicate_email),
    path('user/', SingleUser.as_view()),
    path('register/device/', views.register_device),
    path('register/dog/', views.register_dog),
]