import json
import sqlite3
import serial
import time
import logging
import requests
from logging.handlers import RotatingFileHandler


conn = sqlite3.connect('db.sqlite3')
db = conn.cursor()
db.execute('''
    CREATE TABLE IF NOT EXISTS dog_gps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        datetime DATETIME DEFAULT (datetime('now','localtime')),
        connect BOOLEAN DEFAULT TRUE,
        gpslat FLOAT DEFAULT 0,
        gpslon FLOAT DEFAULT 0
    );
    ''') ### gps는 초단위로 들어오게 connect 변수는 커넥트가 안될때.
db.execute('''
    CREATE TABLE IF NOT EXISTS dog_accel (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        datetime DATETIME DEFAULT (datetime('now','localtime')),
        accel FLOAT,
        level INTEGER
    );
    ''') # 분당 들어오는 거.
print('running...')

ardu = serial.Serial('/dev/ttyUSB0',9600)
gps = serial.Serial('/dev/ttyAMA0', 9600, timeout=1) #timeout

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
file_handler = RotatingFileHandler("logs/data.log", mode='a', maxBytes=1024, backupCount=10, encoding=None, delay=0)
streamHandler = logging.StreamHandler()
logger.addHandler(file_handler)
logger.addHandler(streamHandler)

### 서버로 데이터를 보내야하는거.
url = 'http://192.168.35.197:8000/health/1/rasp/'

cnt = 0
cnt_gps = 0
accel_mean = []
gps_mean_lat = []
gps_mean_lon = []


def dms_to_dec(value, dir): 
    mPos = value.find(".")-2 
    degree = float(value[:mPos]) 
    minute = float(value[mPos:]) 
    converted_degree = float(degree) + float(minute)/float(60) 
    if dir == "W": 
        converted_degree = -converted_degree 
    elif dir == "S": 
        converted_degree = -converted_degree 
    return "%.9f" % float(round(converted_degree, 8)) 

def lat_long(value):
    return [dms_to_dec(value[2], value[3]) , dms_to_dec(value[4], value[5]) ]

while 1:
    x = []
    y = []
    z = []
    gps_lat_lon = []
    tm = time.localtime()
    start = tm.tm_sec
    while start+1>time.localtime().tm_sec:
        try:
            a = ardu.readline()
            b = a.decode()[:-2]
            c=list(map(int,b.split(',')))
            x.append(c[0])
            y.append(c[1])
            z.append(c[2])
        except Exception as e:
            pass 
        try:
            # 1초마다 gps 갖고온다.
            g = gps.readline()
            gps_str=g.decode()
            if gps_str[:6]=='$GPGGA':
                gps_list = gps_str.split(',')
                gps_lat_lon = lat_long(gps_list)
        except:
            pass
        if start==59 and time.localtime().tm_sec==0:
            break
    x_range = abs(max(x)-min(x)) # 가끔씩 없다는 오류가 뜬다.
    y_range = abs(max(y)-min(y))
    z_range = abs(max(z)-min(z))
    accel_mean.extend([x_range,y_range,z_range])
    # print(gps_lat_lon)
    try:
        gps_mean_lat.append(float(gps_lat_lon[0]))
        gps_mean_lon.append(float(gps_lat_lon[1]))
        # print(gps_mean_lat, cnt_gps)
        cnt_gps+=1
    except:
        cnt_gps+=1
        pass
    finally:
        if cnt_gps>=5 and len(gps_mean_lat):
            lat = sum(gps_mean_lat)/len(gps_mean_lat)
            lon = sum(gps_mean_lon)/len(gps_mean_lon)
            gps_mean_lat=[]
            gps_mean_lon=[]
            cnt_gps=0
            db.execute(f'''
            INSERT INTO dog_gps('lat', 'lon')
            VALUES ({lat}, {lon})
            ''')
            conn.commit()
            
    if len(accel_mean)>=180: #1분
        try:
            m = sum(accel_mean)/len(accel_mean)
            lev=''
            ####여기를 수정해서 강아지의 값을 알아 보자
            if m>=25000:
                lev = 2
            elif m>=3000: ### 가만히 숨쉬는게 은근히 값이 높을 수도있다....
                lev = 1
            else:
                lev = 0
            # print('save', m,lev)
            db.execute(f'''
            INSERT INTO dog_accel('accel','level')
            VALUES ({m}, '{lev}');
            ''')
            conn.commit()
            logger.info("값 : " + str(m)+" 정도 : " +  lev) 
            accel_mean=[]
        except Exception as e:
            print(e)
        data_dict = {}
        try:
            db.execute('''
            SELECT ('datetime','level') FROM dog_accel;
            ''')
            accel_rows = db.fetchall()
            data_accels = []
            for accel_row in accel_rows:
                data_accels.append(
                    {
                        'datetime' : accel_row[0],
                        'level' : accel_row[1]
                    }
                )
            data_dict['accels'] = data_accels

            db.execute('''
            SELECT ('datetime', 'lat', 'lon') FROM dog_gps;
            ''')
            gps_rows = db.fetchall()
            data_gps = []
            for gps_row in gps_rows:
                data_gps.append(
                    {
                        'datetime': gps_row[0],
                        'lat' : gps_row[1],
                        'lon' : gps_row[2]
                    }
                )
            data_dict['gps'] = data_gps
            logger.info("데이터를 불러옴")
            print(data_dict) 
        except Exception as e:
            print(e)
            logger.info("unconnected")
        finally:
            try:
                res = requests.post(url, json=data_dict)
                db.execute('''
                DELETE FROM dog_accel;
                DELETE FROM dog_gps;
                ''')
                conn.commit()
            except Exception as e:
                print(e)
            
