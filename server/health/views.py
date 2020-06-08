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

@api_view(['GET'])
def today_activity(request, dog_id):
    today = date.today()
    dog = get_object_or_404(Dog, pk=dog_id)
    activities = Activity.objects.filter(device=dog.device.pk, datetime__startswith=today)
    walkes = WalkingStart.objects.filter(dog=dog.pk, datetime__startswith=today)
    today_dict = {}
    try:
        l, m, h = 0, 0, 0
        for activity in activities:
            if activity.level==1:
                m += 1
            elif activity.level == 2:
                h += 1
            else:
                l += 1
        today_dict['todayAtivity'] = {'low':l, 'medium':m, 'high':h, 'total':l+m+h}
    except Exception as e:
        print(e)
        today_dict['todayAtivity'] = {'low':0, 'medium':0, 'high':0}
    today_dist = 0
    today_cnt = 0
    today_time = timedelta()
    for walk in walkes:
        try:
            walk_info = get_object_or_404(WalkingActive, walking_start=walk.pk)
            walk_end = get_object_or_404(WalkingEnd, walking_start=walk.pk)
            td = walk_end.datetime - walk.datetime
            today_dist += walk_info.distance
            today_cnt+=1
            today_time = today_time + td
        except:
            continue
    today_dict['todayWalk'] = {'walkDistance' : today_dist, 'walkCount':today_cnt, 'walkTime' : today_time.total_seconds()//60}
    # print(today_dist, today_cnt, today_time.total_seconds(), today_time.total_seconds()//60)
    return Response(today_dict)

@api_view(['GET'])
def dog_mia(request, dog_id):
    dog = get_object_or_404(Dog, pk=dog_id)
    recent = Gps.objects.filter(device=dog.device.pk).order_by('-pk')[0]
    mia_url = f'https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version=1&lat={recent.lat}&lon={recent.lon}&coordType=WGS84GEO&addressType=A00&appKey={sk}'
    print(requests.get(mia_url).json())
    try:
        res = requests.get(mia_url).json()
        address = res['addressInfo']['fullAddress']
    except:
        return Response(500)
    return Response({'miaAddress':address, 'lat':recent.lat, 'lon':recent.lon})