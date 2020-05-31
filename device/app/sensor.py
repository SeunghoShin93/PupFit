import sqlite3
import time
import logging
from logging.handlers import RotatingFileHandler

conn = sqlite3.connect('db.sqlite3')
db = conn.cursor()
db.execute('''
    CREATE TABLE IF NOT EXISTS dog_status (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        datetime DATETIME DEFAULT (datetime('now','localtime')),
        heartrate FLOAT,
        temperature FLOAT,
        gpslat FLOAT,
        gpslon FLOAT
    );
    ''')
print('running...')

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
file_handler = RotatingFileHandler("logs/data.log", mode='a', maxBytes=1024, backupCount=10, encoding=None, delay=0)
streamHandler = logging.StreamHandler()
logger.addHandler(file_handler)
logger.addHandler(streamHandler)


while 1:
    try:
        #sensor로 데이터 받아오기 
        db.execute(f''' 
        INSERT INTO dog_status('heartrate','temperature','gpslat','gpslon')
        VALUES (80, 26, 38.898, 70.002);
        ''')
        conn.commit()
        t= time.strftime("%Y-%m-%d %I:%M:%S", time.localtime())
        logger.info("data inserted"+ t)
        time.sleep(5)
    except Exception as e:
        logger.error(e)        
        break 