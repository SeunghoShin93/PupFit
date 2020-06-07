import time, json
from datetime import datetime

from django.shortcuts import render, get_object_or_404
from django.db.models import Q
from django.utils import timezone

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
    # print(request.data)
    try:
        accels = request.data
        for accel in request.data['accels']:
            accel['device'] = device.pk
            serializer = ActivitySerializers(data=accel)
            serializer.is_valid()
            serializer.save()
    except Exception as e:
        print(e)
    try:
        for gps in request.data['gps']:
            gps['device'] = device.pk
            serializer = GpsSerializers(data=gps)
            serializer.is_valid()
            serializer.save()
    except Exception as e:
        print(e)


    return Response({'message':'성공'})

@api_view(['POST'])
@permission_classes((AllowAny, ))
def walking_active(request, dog_id):
    endtime = time.strftime('%Y-%m-%d %X', time.localtime())
    dog = Dog.objects.get(pk=dog_id)
    try:
        serializer = WalkingStartSerializers(data={
            'dog':dog_id, 'datetime':request.data['starttime']
            })
        serializer.is_valid()
        serializer.save()
        walk_id = serializer.data['id']
        serializer = WalkingActiveSerializers(data={
            'walking_start':walk_id,
            'count': request.data['big'],
            'kind': 0
        })
        serializer.is_valid()
        serializer.save()
        seri = WalkingActiveSerializers(data={
            'walking_start':walk_id,
            'count': request.data['small'],
            'kind': 1
        })
        seri.is_valid()
        seri.save()
    
        ### 이 부분에서 tmap리퀘스트 보낸다.
        serializer = WalkingEndSerializers(data={
            'datetime' : endtime,
            'walking_start' : walk_id,
        })
        serializer.is_valid()
        serializer.save()
    except Exception as e:
        print(e)
        return Response({'e':e})
    return Response({'message':'test'})


@api_view(['GET'])
def waliking_list(request):

    return Response({'message':'test'})

@api_view(['GET'])
def wlking_detail(request):

    return Response({'message':'test'})