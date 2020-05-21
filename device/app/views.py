from flask import request
from app import app
from flask_restx import Resource, Api


api = Api(app,version='1.0', title='Rsap for Pupfit', description='라즈베리파이에서 센서값 받고 aws로 정제해서 보내주는 API')
hongsi = 'pupfithonsi'
@api.route('/hello')
# @api.doc(params={'test':'tt'})
class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}


@api.route('/serial')
# @api.doc(params={'serial_num':'str'})
class SerialNumber(Resource):
    def get(self):
        seri = {
            'serial_num':hongsi,
        }
        return seri
        
@api.route('/heartrate')
@api.doc(params={'test':'test'})
class HeartRate(Resource):
    def post(self):
        print(request.data)# json으로 요청올때. 근데 bytes 타입으로 온다..
        # d = request.data
        ##이런형식으로 써야하는구나 
        f = request.form # dict형식이면 이걸로.
        # print(f['test'])
        print(f)
        data = {
            'test':'dummy',

        }
        return data