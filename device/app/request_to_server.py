from pprint import pprint
'''
서버로 requests하는 테스트 파일입니다. 추후 sensor.py로 옮길예정.
'''
import json
import requests
import sqlite3

conn = sqlite3.connect('db.sqlite3')
# conn.row_factory = sqlite3.Row
db = conn.cursor()
db.execute('''
    select * from dog_accel;
''')
rows = db.fetchall()
data_accel = []
for row in rows:
    data_accel.append(
        {
            'id':row[0],
            'datetime' : row[1],
            'level' : row[3]
        }
    )
sample = [{'datetime':'2020-06-05 19:39:00','level':2}]
d = {'accels' : sample}
url = 'http://192.168.35.197:8000/health/1/rasp/'
print(d)
print(type(d))
#print(type(json.dumps(d)))
x = json.dumps(d)
try:
    res = requests.post(url, json=d)
    print(res.status_code)
except Exception as e:
    print(e)
