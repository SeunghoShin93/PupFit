from django.conf import settings
from django.test import RequestFactory, TestCase, Client
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from rest_framework.test import APIRequestFactory, force_authenticate, APIRequestFactory, APITestCase, APIClient
from .views import check_duplicate_email, login, SingleUser, device, dog_apply
from accounts.utils import LoginAuthBackend
import jwt, json
from .models import *

User = get_user_model()


class CheckEmailTests(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.user = User.objects.create_user(
            username='user1', email='user1@test.com', password='123456'
        )

    def test_check_email_duplicate_with_already_existing_email(self):
        """
        이미 존재하는 이메일 체크
        """
        test_email = 'user1@test.com'
        request = self.factory.get(f'exists/email/{test_email}/')
        response = check_duplicate_email(request, test_email)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {'exists': True})

    def test_check_email_duplicate_with_new_email(self):
        """
        존재하지 않는 이메일 체크
        """
        test_email = 'user2@test.com'
        request = self.factory.get(f'exists/email/{test_email}/')
        response = check_duplicate_email(request, test_email)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {'exists': False})


class LoginTests(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.user = User.objects.create_user(
            username='user1', email='user1@test.com', password='123456'
        )

    def test_login_with_registered_user(self):
        """
        회원인 사용자 로그인
        """
        login_data = {
            'email': 'user1@test.com',
            'password': '123456'
        }
        
        response = login(request)
        self.assertEqual(response.status_code, 200)
        decoded = jwt.decode(response.data['token'], settings.SECRET_KEY, algorithms=['HS256'])
        user = User.objects.get(pk=decoded['userId'])
        self.assertEqual(user.email, login_data['email'])
        self.assertEqual(user.check_password(login_data['password']), True)

    def test_login_with_unregistered_user(self):
        """
        회원이 아닌 사용자 로그인
        """
        login_data = {
            'email': 'user0@test.com',
            'password': '123456'
        }
        request = self.factory.post('accounts/login/', data=json.dumps(login_data), content_type='application/json')
        response = login(request)
        self.assertEqual(response.status_code, 401)


class SignUpTests(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        
        self.user_data = {
            'username': 'user1', 'email': 'user1@test.com', 'password': '123456'
        }
        User.objects.create_user(**self.user_data)
        request = self.factory.post('accounts/login/', data=self.user_data)
        response = login(request)
        self.assertEqual(response.status_code, 200)
        self.jwt = response.data['token']
    
    def test_new_user_signup_without_logged_in(self):
        """
        로그인X, 새 이메일, 새 username
        """
        signup_data = {
            'username': 'user2',
            'email': 'user2@test.com',
            'password': '123456'
        }

        request = self.factory.post('accounts/user/', data=signup_data)

        response = SingleUser().post(request)
        self.assertEqual(response.status_code, 200)
        decoded = jwt.decode(response.data['token'], settings.SECRET_KEY, algorithms=['HS256'])
        user = User.objects.get(pk=decoded['userId'])
        self.assertEqual(user.email, signup_data['email'])
        self.assertEqual(user.username, signup_data['username'])
        self.assertEqual(user.check_password(signup_data['password']), True)

    def adsf(self):
        """
        로그인 되어있을 때
        """
        request = self.factory.post(
            'accounts/user/', data=self.user_data, Token='123'
        )
        print(type(request.headers))
        request.headers['Cookie'] = 'a'
        print(request.headers)
        response = SingleUser().post(request)
        self.assertEqual(response.status_code, 403)

    def asfd(self):
        """
        로그인X, 이메일이 중복될 때
        """
        pass

    def adfasf(self):
        """
        로그인X, Username이 중복될 때
        """
        pass

class DeviceTests(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.user = User.objects.create_user(
            username='user1', email='user1@test.com', password='123456'
        )

    def test_new_device(self):
        """
        새로운 유저 기기 최초등록
        """
        device_data = {
            "device_num": 1234,
        }
        request = self.factory.post(
            'accounts/device/', data=json.dumps(device_data), content_type='application/json'
            )
        response = device(request)
        device_id = Device.objects.get(id=device_data["device_num"])
        self.asserEqual(device_id.id, request.data["device_num"])

    def test_exist_device(self):
        """
        기존에 등록된 기기가 있을 때
        """
        pass

class DogApplyTests(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.user = User.objects.create_user(
            username='user1', email='user1@test.com', password='123456'
        )

    def test_new_dog_apply(self):
        """
        기기에 저장된 강아지 정보가 없을 때
        """
        dog_data = {
            "device_id": 1234,
            "name": "hongsi",
            "breed": "보더 콜리",
            "age": 5,
            "height": 50,
            "weight": 26
        }
        token = Token.objects.get(user__username='user1')
        client = APIClient(HTTP_AUTHORIZATION='Token ' + token.key)
        # response = client.get('/patientFull/1/',headers={'Authorization': 'Token ' + token.key})
        request = self.factory.post(
            'accounts/dogapply/', data=json.dumps(dog_data), content_type='application/json',
            headers={'Authorization': 'Token ' + token.key}
            )
        response = dog_apply(request)
        self.assertEqual(response.status_code, 201)

    def test_exist_dog_apply(self):
        """
        이미 기기에 저장된 강아지 정보가 있을 때
        """
        pass