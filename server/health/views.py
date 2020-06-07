import time, json, requests
from decouple import config
from datetime import datetime, date

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

sk = config('TMAP_API_KEY')
url = 'https://apis.openapi.sk.com/tmap/road/matchToRoads?version={}&appKey={}'.format(1,sk)
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
    endtime = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    dog = Dog.objects.get(pk=dog_id)
    print(request.data)
    ### gps 시간별로 뽑아오기.
    try:
        startgps = Gps.objects.filter(
            device=dog.device.pk, 
            datetime__startswith=str(request.data['starttime'])[:-3])[:1]
        endgps = Gps.objects.order_by('-pk')[0]
        gpses = Gps.objects.filter(
            device=dog.device.pk, 
            pk__gte=startgps[0].pk,
            pk__lte=endgps.pk)
    except Exception as e:
        print('gps section #############################')
        print(e)
        return Response({'error':e})
    #### tmap api 
    try:
        cnt = len(gpses)//90 + 1
        dist = 0
        text_gps = ''
        for i in range(cnt):
            str_gps=''
            for gps in gpses[90 * i:90 * (i+1)]:
                str_gps +=  f'{gps.lon},{gps.lat}|'
            print(str_gps)
            payload = {
                'responseType':1,
                'coords':str_gps
            }
            res = requests.post(url, params=payload)
            data = res.json()
            dist += data['resultData']['header']['totalDistance']
            for g in data['resultData']['matchedPoints']:
                text_gps += f"{g['matchedLocation']['latitude']},{g['matchedLocation']['longitude']}|"
        print(dist)
        print(text_gps)
    except Exception as e:
        print(e)
        return Response({'message':e})
    try:
        serializer = WalkingStartSerializers(data={
            'dog':dog_id, 'datetime':request.data['starttime']
            })
        serializer.is_valid()
        serializer.save()
        walk_id = serializer.data['id']
        seri = WalkingActiveSerializers(data={
            'walking_start':walk_id,
            'small': request.data['small'],
            'big': request.data['big'],
            'distance':dist,
            'gps':text_gps            
        })
        seri.is_valid()
        seri.save()    
        serializer_end = WalkingEndSerializers(data={
            'walking_start' : walk_id,
            'datetime' : endtime
        })
        serializer_end.is_valid()
        serializer_end.save()
    except Exception as e:
        print(e)
        return Response({'e':e})
    # return Response({'start':serializer.data,'active':seri.data,'end':serializer_end.data})
    return Response({'message':'save data !!'})

@api_view(['GET']) ### api상의 
def waliking_list(request):

    return Response({'message':'test'})

@api_view(['GET'])
def wlking_detail(request):

    return Response({'message':'test'})