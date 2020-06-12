# README

- PupFit에서 사용되는 raspberry pi 4 의 간략한 소개 페이지 입니다.



## 1. 소개

- Raspberry pi 4는 GPS, Arduino nano, 가속도센서로 구성되어 있다. 
- GPS는 Raspberry pi 와 시리얼통신으로 데이터값을 전송한다. 
- 가속도 센서는 Arduino nano를 통해 센서값을 받아내고 Arduino nano와 Raspberry pi 와 시리얼 통신으로 값을 전달한다.

- 센서 데이터를 수집하고 db저장 및 aws전송하는 파일은 `app/sensor.py`에서 확인 가능하다.



### 1-1 GPS

- 1초당 GPS raw data를 받아 정제를 한후 경도, 위도 데이터를 만든다.
- 불안정한 데이터(안테나 불량 등의 원인)로 인해 5초간의 경도, 위도의 값의 평균으로 저장한다.



### 1-2 가속도 센서

- 아두이노에서 200ms마다 센서값을 받아온다.
- 라즈베리파이에서 들어온 값을 1분간 저장한 후 평균으로 하여 애완견의 활동량을 측정한다. 



### 1-3 DataBase

- DataBase는 sqlite3를 사용하여 1분간의 데이터를 저장하고 aws서버로 전송을 하고 난 후 db에서 삭제한다.

dog_gps table

```sqlite
CREATE TABLE IF NOT EXISTS dog_gps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        datetime DATETIME DEFAULT (datetime('now','localtime')),
        connect BOOLEAN DEFAULT TRUE,
        gpslat FLOAT DEFAULT 0,
        gpslon FLOAT DEFAULT 0
    );
```

dog_accel table

```sqlite
CREATE TABLE IF NOT EXISTS dog_accel (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        datetime DATETIME DEFAULT (datetime('now','localtime')),
        accel FLOAT,
        level INTEGER
    );
```

