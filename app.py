from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from model import User, Book

app = Flask(__name__)
app.config.from_object('config.Config')

db = SQLAlchemy(app)

with app.app_context():
    db.create_all()

@app.route("/")
def home():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)
