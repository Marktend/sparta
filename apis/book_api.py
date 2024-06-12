from flask import Blueprint, request, jsonify
from model import Book
from app import db

book_bp = Blueprint('book', __name__, url_prefix='/api/book')


@book_bp.route('/book/check_connection', methods=['GET'])
def check_connection():
    return jsonify({"message": "Connection with Postman established."})

@book_bp.route('/create', methods=['POST'])
def create_book():

    data = request.json
    title = data.get('title')
    author = data.get('author')
    book_info = data.get('book_info')
    subject = data.get('subject')
    rental = data.get('rental')
    user_id = data.get('user_id')
    img_url = data.get('img_url')

    if not all([title, author, book_info, subject, rental, user_id, img_url]):
        return jsonify({"error": "Incomplete book information"}), 400

    new_book = Book(title=title, author=author, book_info=book_info, subject=subject, rental=rental, user_id=user_id, img_url=img_url)

    db.session.add(new_book)
    db.session.commit()

    return jsonify({"message": "Book created successfully"}), 201

