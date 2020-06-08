import time, json, requests
from decouple import config
from datetime import datetime, date, timedelta

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
            # print(str_gps)
            payload = {
                'responseType':1,
                'coords':str_gps
            }
            res = requests.post(url, params=payload)
            data = res.json()
            dist += data['resultData']['header']['totalDistance']
            for g in data['resultData']['matchedPoints']:
                text_gps += f"{g['matchedLocation']['latitude']},{g['matchedLocation']['longitude']}|"
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

@api_view(['GET'])
def walking_info(request, dog_id):
    starts = WalkingStart.objects.filter(dog=dog_id).order_by('-pk')
    walk_list = []
    for start in starts:
        try:
            activity = get_object_or_404(WalkingActive, walking_start=start.pk)
            end = get_object_or_404(WalkingEnd, walking_start=start.pk)
            tdelta = end.datetime-start.datetime
            walk_list.append({
                'startId' : start.pk,
                'startTime' : start.datetime,
                'small' : activity.small,
                'big' : activity.big,
                'distance' : activity.distance,
                'gps' : activity.gps,
                'endTime' : end.datetime,
                'timeDelta' : tdelta.total_seconds()
            })
        except Exception as e:
            print(e)
            continue
            # return Response({"error":e})    
    return Response({'data' : walk_list})

@api_view(['GET'])
def weekly_data(request):
    today = date.today()
    delta = timedelta(days=7)
    start_date = today - delta
    weekly_info = DogInfo.objects.filter(date__gte=str(start_date), date__lte=str(today))
    serializer = DogInfoSerializers(weekly_info, many=True).data
    return Response(serializer)

# 혜진 언니 이거 만드는 중이었엉..... 일주일 단위로 거리 하는거..
# def weekly_distance(request, dog_id):
#     dog = Dog.objects.get(pk=dog_id)
    
#     d_week = 
#     print(request.data)

#     try:
#         today_distances = WalkingStart.objects.filter(
#             device=dog.device.pk, 
#             datetime__startswith=str(request.data['starttime'])[:-3]).date
        
#         sum_today_distances = today_distances.filter()