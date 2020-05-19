from flask import Flask
from flask_restplus import Api

app = Flask(__name__)

api = Api(app, version='1.0', title='라즈베리파이 api', description='센서값들을 모아서 aws로 보내주는 api')

# import app.views
from app import views
