# from flask import current_app
from flask_restplus import Api, Resource, fields
# import api

@api.route('/test')
def hello():
    return hello

# @api.route('/')
# def index():
#     return {'message':'test'}
# class InputManage(Resource):
#     def get(self):
#         return {'message':'Test swagger'}