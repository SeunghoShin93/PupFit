from django.conf import settings
from django.test import RequestFactory, TestCase, Client
from django.contrib.auth import get_user_model
from .views import check_duplicate_email, login, SingleUser

import jwt, json, requests

User = get_user_model()

BASE_URL = "http://localhost:8000/"

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
        request = self.factory.post('accounts/login/', data=json.dumps(login_data), content_type='application/json')
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

    def test_signup_with_logged_in_user(self):
        """
        로그인 되어있을 때
        """
        url = f"{BASE_URL}accounts/user/"
        response = requests.post(url, data=self.user_data, headers={'Token': self.jwt})
        # request = self.factory.post(
        #     'accounts/user/', data=self.user_data, Token='123'
        # )
        # print(type(request.headers))
        # request.headers['Cookie'] = 'a'
        # print(request.headers)
        # response = SingleUser().post(request)
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