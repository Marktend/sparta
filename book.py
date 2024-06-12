from flask import Blueprint
from model import Book
from app import db

book_api = Blueprint('book', __name__)

@book_bp.route('/book')
def get_books():
    return 'List of books'

