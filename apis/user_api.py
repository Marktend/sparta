from flask import Blueprint
from model import User
from app import db

user_bp = Blueprint('user', __name__)

@user_bp.route('/user')
def get_users():
    return 'List of users'

