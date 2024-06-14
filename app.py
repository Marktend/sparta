# app.py
from flask import Flask, render_template
from flask_login import LoginManager
from db import db




def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    app.config['SECRET_KEY'] = 'your_secret_key_here'

    db.init_app(app)

    from auth import auth_bp, login_manager
    app.register_blueprint(auth_bp)

    login_manager.init_app(app)

    from views import book_view
    app.register_blueprint(book_view.book_view_bp)

    from views import user_view
    app.register_blueprint(user_view.user_view_bp)

    from apis import book_api
    app.register_blueprint(book_api.book_bp)

    from apis import user_api
    app.register_blueprint(user_api.user_bp)

    with app.app_context():
        db.create_all()

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
