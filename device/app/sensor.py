import sqlite3
import serial
import time
import logging
import numpy
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
        level VARCHAR(10)
    );
    ''') # 분당 들어오는 거.
print('running...')

# logger = logging.getLogger(__name__)
# logger.setLevel(logging.DEBUG)
# file_handler = RotatingFileHandler("logs/data.log", mode='a', maxBytes=1024, backupCount=10, encoding=None, delay=0)
# streamHandler = logging.StreamHandler()
# logger.addHandler(file_handler)
# logger.addHandler(streamHandler)

ardu = serial.Serial('COM8',9600)
gps = serial.Serial('COM7', 9600, timeout=1) #timeout
cnt = 0
accel_mean = []

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
    return ['lat : ' + dms_to_dec(value[2], value[3]) , 'long : ' + dms_to_dec(value[4], value[5]) ]

while 1:
    x = []
    y = []
    z = []
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
        g = gps.readline()
        try:
            gps_str=g.decode()
            if gps_str[:6]=='$GPGGA':
                print(gps_str)
                gps_list = gps_str.split(',')
                print(lat_long(gps_list))
        except Exception as e:
            # print(e)
            # db를 저장안하고 간다.
            pass            
        # print(tm.tm_sec)
        if start==59 and time.localtime().tm_sec==0:
            break
    x_range = abs(max(x)-min(x))
    y_range = abs(max(y)-min(y))
    z_range = abs(max(z)-min(z))
    accel_mean.extend([x_range,y_range,z_range])
    # print(accel_mean)
    
    
        
    if len(accel_mean)==30:
        try:
            m = numpy.mean(accel_mean)
            ####여기를 수정해서 강아지의 값을 알아 보자
            if m>30000:
                lev='H'
            elif m>2000: ### 가만히 숨쉬는게 은근히 값이 높을 수도있다....
                lev = 'M'
            else:
                lev = 'L'
            print('save', m,lev)
            # db.execute()
            
            accel_mean=[]
        except Exception as e:
            print(e)
    # try:
    #     #sensor로 데이터 받아오기 
    #     db.execute(f''' 
    #     INSERT INTO dog_status('heartrate','temperature','gpslat','gpslon')
    #     VALUES (80, 26, 38.898, 70.002);
    #     ''')
    #     conn.commit()
    #     # t= time.strftime("%Y-%m-%d %I:%M:%S", time.localtime())
    #     # logger.info("data inserted"+ t)
    #     # time.sleep(5)
    # except Exception as e:
    #     # logger.error(e)        
    #     break 