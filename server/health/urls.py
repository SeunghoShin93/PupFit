from django.urls import path
from . import views

urlpatterns = [
    path('<int:device_id>/rasp/', views.rasp),
    path('<int:dog_id>/walking/', views.walking_active),
    path('<int:dog_id>/walking/list/', views.walking_info),
    path('weeklydata/', views.weekly_data),
    path('today/<int:dog_id>/', views.today_activity),
    path('mia/<int:dog_id>/', views.dog_mia),
]