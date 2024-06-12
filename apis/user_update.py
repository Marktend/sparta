from flask import Blueprint, request, jsonify
from model import User
from app import db

user_bp1 = Blueprint('user1', __name__, url_prefix='/api')

# 호출 및 반환만 있는 간단한 API
@user_bp1.route('/user/check_connection', methods=['GET'])
def check_connection():
    return jsonify({"message": "Connection with Postman established."})

@user_bp1.route('/user/create', methods=['POST'])
def create_user():
    # POST 요청에서 사용자 정보 추출
    data = request.json
    nickname = data.get('nickname')
    email = data.get('email')
    password = data.get('password')
    phone_number = data.get('phone_number')

    # 사용자 정보 유효성 검사
    if not all([nickname, email, password, phone_number]):
        return jsonify({"error": "Incomplete user information"}), 400

    # 이미 존재하는 이메일인지 확인
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "Email already exists"}), 400

    # 새 사용자 생성
    new_user = User(nickname=nickname, email=email, password=password, phone_number=phone_number)

    # 데이터베이스에 추가
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201

@user_bp1.route('/user/update/<int:user_id>', methods=['PATCH'])
def update_user(user_id):

    data = request.json
    nickname = data.get('nickname')
    email = data.get('email')
    password = data.get('password')
    phone_number = data.get('phone_number')


    if not any([nickname, email, password, phone_number]):
        return jsonify({"error": "No update information provided"}), 400


    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    if nickname:
        user.nickname = nickname
    if email:
        user.email = email
    if password:
        user.password = password
    if phone_number:
        user.phone_number = phone_number

    db.session.commit()

    return jsonify({"message": "User updated successfully"}), 200
