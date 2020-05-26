import sqlite3
import time

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
while 1:
    try:
        #sensor로 데이터 받아오기 
        db.execute(f''' 
        INSERT INTO dog_status('heartrate','temperature','gpslat','gpslon')
        VALUES (80, 26, 38.898, 70.002);
        ''')
        conn.commit()
        time.sleep(5)
    except:
        print('error')
        break
