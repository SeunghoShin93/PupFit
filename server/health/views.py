from django.shortcuts import render, get_object_or_404

from .serializers import *
from .models import *

from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import AllowAny

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

# Create your views here.
@api_view(['POST'])
@permission_classes((AllowAny,))
@swagger_auto_schema(
    operations_summary='라즈베리 데이터 저장'
)
def rasp(request, device_id):
    device = get_object_or_404(Device, pk=device_id)
    try:
        accels = request.data
        for accel in request.data['accels']:
            print(accel)
            accel['device'] = device.pk
            serializer = ActivitySerializers(data=accel)
            serializer.is_valid()
            serializer.save()
    except Exception as e:
        print(e)
        return Response({'message':'error !!'})

    return Response({'message':'성공'})
    



