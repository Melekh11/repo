from flask import Flask, redirect
from flask_sqlalchemy import SQLAlchemy
from app_config import Config
from flask_migrate import Migrate


app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)


# удобное тестирование через python оболочку
@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, "Post": Post, "Pos": Position, "Org": Organization}


@app.route('/')
def index():
    return "hello world"


@app.route("/api/resp")
def resp():
    return {"str": "this is server render!"}


from tables.__all_models import *

