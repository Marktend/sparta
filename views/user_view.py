from flask import Blueprint, render_template

user_api = Blueprint('user', __name__)

@user_bp.route('/users')
def get_users():

    return render_template('users.html')
