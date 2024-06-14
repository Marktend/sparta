from flask import Blueprint, render_template

book_view_bp = Blueprint('book_view', __name__)

@book_view_bp.route('/')
def home():
    return render_template('books.html')