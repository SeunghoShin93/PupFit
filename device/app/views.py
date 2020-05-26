import sqlite3
from flask import request
from app import app
from flask_restx import Resource, Api


api = Api(app,version='1.0', title='Rsap for Pupfit', description='라즈베리파이에서 센서값 받고 aws로 정제해서 보내주는 API')
hongsi = 'pupfithonsi'
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
        #print(request.data)# json으로 요청올때. 근데 bytes 타입으로 온다..
        # d = request.data
        ##이런형식으로 써야하는구나 
        f = request.form # dict형식이면 이걸로.
        # print(f['test'])
        con = sqlite3.connect('db.sqlite3')
        con.row_factory = sqlite3.Row
        cur = con.cursor()
        data = {}        
        for idx, row in enumerate(cur.execute('SELECT * FROM dog_status')):
            data[f'info{idx}'] = {
                'id':row[0],
                'datetime':row[1],
                'heartrate':row[2],
                'temperature':row[3],
                'gpslat':row[4],
                'gpslon':row[5],
            }


        return data