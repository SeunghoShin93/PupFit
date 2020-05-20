from app import app
from flask_restx import Resource, Api

api = Api(app,version='1.0', title='Rsap for Pupfit', description='라즈베리파이에서 센서값 받고 aws로 정제해서 보내주는 API')

@api.route('/hello')
@api.doc(params={'test':'tt'})
class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}


@api.route('/serial')
# @api.doc(params={'serial_num':'str'})
class SerialNumber(Resource):
    def get(self):
        seri = {
            'serial_num':'hongsi',
        }
        return seri
