from time import time

from django.conf import settings
from django.contrib.auth import get_user_model, authenticate
from django.http import Http404
from django.shortcuts import render, get_object_or_404

from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

import jwt

from .serializers import *
from .models import Dog, Breed, Device
from health.models import DogInfo

from datetime import date

def is_logged_in(request):
    try:
        encoded_jwt = request.headers['Token']
        decoded = jwt.decode(encoded_jwt, settings.SECRET_KEY, algorithms=['HS256'])
        user = get_user_model().objects.get(pk=decoded['userId'])
    except:
        raise AuthenticationFailed
    return user


class SingleUser(APIView):
    @swagger_auto_schema(
        operation_summary='회원 본인 정보 조회'
        )
    def get(self, request):
        user = is_logged_in(request)
        serializers = UserSerializers(user)
        return Response(serializers.data, status=200)

    @swagger_auto_schema(
        request_body=SignUpserializers,
        operation_summary='회원가입'
        )
    def post(self, request):
        """
        email과 username은 unique.
        가입 성공하면 status 200과 {'token': '~~~~~'} 형식으로 JWT를 반환합니다.
        이미 존재하거나 입력 형식 올바르지 않으면 {"입력 필드명": ["에러메시지 1", "에러메시지 2", ...]} 형식의 object와 status 400을 반환합니다.
        사용자가 이미 로그인한 상태이면 status 403을 반환합니다.
        """
        try:
            is_logged_in(request)
        except:  # 로그인 되어있지 않으면 회원가입 진행
            serializers = SignUpserializers(data=request.data)
            serializers.is_valid(raise_exception=True)
            user = get_user_model().objects.create_user(**serializers.data)
            payload = PayloadSerializers(user)
            encoded = jwt.encode(payload.data, settings.SECRET_KEY, algorithm='HS256')
            return Response({'token': encoded}, status=200)
        return Response(status=403)

    @swagger_auto_schema(
        operation_summary='회원 정보 수정',
        operation_description='gender: 0 or 1',
        request_body=UserSerializers,
        manual_parameters=[
            openapi.Parameter(
                'Token',
                openapi.IN_HEADER,
                description='JWT',
                type=openapi.TYPE_STRING,
                required=True
                )
            ]
        )
    def put(self, request):
        user = is_logged_in(request)
        serializers = UserSerializers(data=request.data, instance=user)
        serializers.is_valid(raise_exception=True)
        serializers.save()
        return Response(status=200)

    @swagger_auto_schema(
        operation_summary='회원 탈퇴',
        manual_parameters=[
            openapi.Parameter(
                'Token',
                openapi.IN_HEADER,
                description='JWT',
                type=openapi.TYPE_STRING,
                required=True
                )
            ]
        )
    def delete(self, request):
        user = is_logged_in(request)
        user.delete()
        return Response(status=200)

@swagger_auto_schema(
    operation_summary='로그인',
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            "email": openapi.Schema(type=openapi.TYPE_STRING),
            "password": openapi.Schema(type=openapi.TYPE_STRING)
            },
        required=["email", "password"]
        )
    )
@api_view(['POST'])
def login(request):
    user = authenticate(request=request, email=request.data.get('email'), password=request.data.get('password'))
    if user is None:
        return Response(status=401)
    payload = PayloadSerializers(user)
    encoded = jwt.encode(payload.data, settings.SECRET_KEY, algorithm='HS256')
    return Response({'token': encoded})

@swagger_auto_schema(
    operation_summary='Email 중복 체크',
    method='get'
    )
@api_view(['GET'])
def check_duplicate_email(request, email):
	try:
		get_user_model().objects.get(email=email)
	except:
		return Response(data={'exists': False}, status=200)
	return Response(data={'exists': True}, status=200)

# 기기 등록
"""
최초 로그인시, 기기 등록하고 강아지 정보 입력(Dog 이랑 one to one)
"""
@swagger_auto_schema(
    operation_summary='기기등록',
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            "device_num": openapi.Schema(type=openapi.TYPE_INTEGER),
            },
        required=["device_num"]
        ),
    manual_parameters=[
        openapi.Parameter(
            'Token',
            openapi.IN_HEADER,
            description='JWT',
            type=openapi.TYPE_STRING,
            required=True
            )
        ]
    )
@api_view(['POST'])
def device(request):
    user = is_logged_in(request)
    try:
        device_num = request.data["device_num"]
    # device_num 없으면 400에러
    except:
        return Response(status=400)
    
    # device_num 있으면..
    try:
        device = Device.objects.get(id=device_num)
    # 신규 기기 등록
    except:
        device = Device.objects.create(id=device_num)
    return Response(status=200)
    
# 강아지 등록
"""
해당 기기에 기존에 등록된 정보가 있다면 그 정보 불러오고
없다면 생성(Dog model)
"""
@swagger_auto_schema(
    operation_summary='강아지 정보등록',
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            "name": openapi.Schema(type=openapi.TYPE_STRING),
            "age": openapi.Schema(type=openapi.TYPE_INTEGER),
            "breed": openapi.Schema(type=openapi.TYPE_STRING),
            "height": openapi.Schema(type=openapi.TYPE_FLOAT),
            "weight": openapi.Schema(type=openapi.TYPE_FLOAT),
            },
        required=["name", "age", "breed"]
        ),
    manual_parameters=[
        openapi.Parameter(
            'Token',
            openapi.IN_HEADER,
            description='JWT',
            type=openapi.TYPE_STRING,
            required=True
            )
        ]
    )
@api_view(['POST'])
def dog_apply(request, device_id):
    user = is_logged_in(request)

    breed = request.data["breed"]
    name = request.data["name"]
    profile = request.data.get("profile")
    age = request.data["age"]
    height = request.data.get("height")
    weight = request.data.get("weight")
    breed = Breed.objects.get(name=breed)
    # 강아지는 한국식으로 안세요.
    birthyear = date.today().year - age
    dog = Dog.objects.create(name=name, breed=breed, birthyear=birthyear)
    user.dogs.add(dog)
    
    if height is not None or weight is not None:
        doginfo = DogInfo.objects.create(height=height, weight=weight)
        dog.doginfo_set.add(doginfo)
    return Response(status=201)
