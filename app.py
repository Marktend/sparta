from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# AWS RDS 연결 정보
aws_db = {
    "user": "admin",
    "password": "123456789a",
    "host": "database-1.civgmymwfbly.ap-northeast-2.rds.amazonaws.com",
    "port": "3306",
    "database": "spartan_18",
}

app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{aws_db['user']}:{aws_db['password']}@{aws_db['host']}:{aws_db['port']}/{aws_db['database']}?charset=utf8mb4"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

with app.app_context():
    db.create_all()

@app.route("/")
def home():

    return render_template('index.html')


if __name__ == "__main__":
    app.run(debug=True)
