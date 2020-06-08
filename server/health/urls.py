from django.urls import path
from . import views

urlpatterns = [
    path('<int:device_id>/rasp/', views.rasp),
    path('<int:dog_id>/walking/', views.walking_active),
    path('weeklydata/', views.weekly_data)
    path('<int:dog_id>/walking/list/', views.waliking_list),
    path('<int:dog_id>/walking/list/<int:walk_id>', views.wlking_detail),
]