aws_db = {
    "user": "{admin}",
    "password": "{123456789a}",
    "host": "{database-1.civgmymwfbly.ap-northeast-2.rds.amazonaws.com}",
    "port": "3306", # Maria DB의 포트
    "database": "{database-1}",
}

SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{aws_db['user']}:{aws_db['password']}@{aws_db['host']}:{aws_db['port']}/{aws_db['database']}?charset=utf8"
