from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect

from rest_framework import permissions

from drf_yasg.views import get_schema_view
from drf_yasg import openapi
# from accounts.utils.EmailAuthBackend import EmailAuthBackend

# try:
#     swagger_base_url = settings.SWAGGER_BASE_URL
# except:
#     swagger_base_url = 'http://i02b208.p.ssafy.io:8000'

schema_view = get_schema_view(
    openapi.Info(
        title="PUPFIT API Server",
        default_version='v1',
        contact=openapi.Contact(name="Hyejin Yang", email="yang94lol@naver.com", url="https://github.com/HyejinYang"),
        ),
    # authentication_classes=(EmailAuthBackend,),
    # validators=['ssv'],
    public=True,
    permission_classes=(permissions.AllowAny,),
    # url=swagger_base_url,
)

urlpatterns = [
    path('', lambda requests: redirect('/swagger')),
    path('admin/', admin.site.urls),
    path('swagger/', schema_view.with_ui('swagger')),
    path('accounts/', include('accounts.urls')),
    path('health/', include('health.urls')),
]
