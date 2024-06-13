from flask import Blueprint, render_template

book_bp = Blueprint('/books', __name__)

@book_bp.route('/books')
def get_users():
    return render_template('books.html')
