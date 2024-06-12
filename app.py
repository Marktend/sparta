# app.py
from flask import Flask, render_template
from db import db


def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    db.init_app(app)

    from apis import user_update
    app.register_blueprint(user_update.user_bp1)

    from views import main_views
    app.register_blueprint(main_views.bp)

    from apis import book_api
    app.register_blueprint(book_api.book_bp)

    @app.route("/")
    def home():
        return render_template('index.html')

    with app.app_context():
        db.create_all()

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
