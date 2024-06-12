from flask import Blueprint, render_template

book_bp = Blueprint('user', __name__)


@user_bp.route('/books')
def get_users():
    return render_template('books.html')
