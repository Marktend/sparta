from flask import Blueprint, render_template

user_view_bp = Blueprint('user_view', __name__)

@user_view_bp.route('/users')
def get_users():

    return render_template('users.html')
