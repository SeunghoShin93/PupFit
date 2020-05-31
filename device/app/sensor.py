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
        connect BOOLEAN DEFAULT FALSE,
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
    ''') # 1초당 들어오는 값들의 평균이 저장된다. 임시적으로...음.. 근데 그럼..어쩌지...
print('running...')

# logger = logging.getLogger(__name__)
# logger.setLevel(logging.DEBUG)
# file_handler = RotatingFileHandler("logs/data.log", mode='a', maxBytes=1024, backupCount=10, encoding=None, delay=0)
# streamHandler = logging.StreamHandler()
# logger.addHandler(file_handler)
# logger.addHandler(streamHandler)

ardu = serial.Serial('COM8',9600)
gps = serial.Serial('COM7', 9600,)
cnt = 0
accel_mean = []
while 1:
    x = []
    y = []
    z = []
    tm = time.localtime()
    start = tm.tm_sec
    while start+1>time.localtime().tm_sec:
        a = ardu.readline()
        b = a.decode()[:-2]
        c=list(map(int,b.split(',')))
        x.append(c[0])
        y.append(c[1])
        z.append(c[2])
        # print(tm.tm_sec)
        if start==59 and time.localtime().tm_sec==0:
            break
    x_range = abs(max(x)-min(x))
    y_range = abs(max(y)-min(y))
    z_range = abs(max(z)-min(z))
    accel_mean.extend([x_range,y_range,z_range])
    # print(accel_mean)
    if len(accel_mean)==180:
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