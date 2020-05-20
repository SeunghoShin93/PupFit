from app import db
from datetime import datetime

class DogStatus(db.Model):
    __tablename__='dog_status'
    __table_args__={'mysql_collate':'utf8_general_ci'}
    id = db.Column(db.Integer, primary_key=True)
    datetime = db.Column(db.DateTime, default=datetime.utcnow())
    heartrate = db.Column(db.Float)
    temparature = db.Column(db.Float)
    gpslat = db.Column(db.String(50))
    gpslon = db.Column(db.String(50))
