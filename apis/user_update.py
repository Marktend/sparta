from flask import Blueprint, request, jsonify
from model import User
from app import db

user_bp1 = Blueprint('user1', __name__)

# 호출 및 반환만 있는 간단한 API
@user_bp1.route('/user/check_connection', methods=['GET'])
def check_connection():
    return jsonify({"message": "Connection with Postman established."})
