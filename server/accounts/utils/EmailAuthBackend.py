from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend

UserModel = get_user_model()

class EmailAuthBackend(ModelBackend):
    """
    Username 대신 email로 인증을 수행하는 백엔드 모듈
    """
    def authenticate(self, request, email=None, password=None, **kwargs):
        print('asdfasfas', email, password)
        if email is None:
            email = kwargs.get(UserModel.USERNAME_FIELD)
        if email is None or password is None:
            return
        try:
            print(UserModel._default_manager)
            user = UserModel._default_manager.get_by_natural_key(email)
        except UserModel.DoesNotExist:
            # Run the default password hasher once to reduce the timing
            # difference between an existing and a nonexistent user (#20760).
            UserModel().set_password(password)
        else:
            if user.check_password(password) and self.user_can_authenticate(user):
                return user