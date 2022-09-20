from app_config import Config
from flask_migrate import Migrate
from create_app import create_app
from flask_sqlalchemy import SQLAlchemy

app, db = create_app(Config)
migrate = Migrate(app, db)


# удобное тестирование через python оболочку
@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': db.User, "Post": db.Post, "Pos": db.Position, "Org": db.Organization}


@app.route('/')
def index():
    return "hello world"


@app.route("/api/resp")
def resp():
    from tables.models import User
    arr = [user for user in User.query.all()]
    return {"str": f" {arr}this is server render!"}
