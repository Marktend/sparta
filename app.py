from flask import Flask
import config
from db_connect import db

def create_app(test_config=None):
    app = Flask(__name__)

    # Config 설정
    if test_config is None:
        app.config.from_object(config)
    else:
        app.config.update(test_config)

    db.init_app(app)

    return app


if __name__ == "__main__":
    create_app().run()