from django.urls import path
from . import views
from .views import SingleUser

urlpatterns = [
    path('login/', views.login),
    path('exists/email/<str:email>/', views.check_duplicate_email),
    path('user/', SingleUser.as_view()),
    path('device/', views.device),
    path('<int:device_id>/dogapply/', views.dog_apply),
]