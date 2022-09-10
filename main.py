import os
from flask import Flask
from app_config import Config
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)


@app.route('/')
def index():
    return "hello world"


@app.route("/api/resp")
def resp():
    return {"str": "this is server render!"}


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
