from app_config import Config
from flask_migrate import Migrate
from create_app import create_app
from flask_restful import Api
from database import db
import flask


app = create_app(Config)
api = Api(app)

migrate = Migrate(app, db)


# @app.route("/")
# def index():
#     return flask.send_file("./front/build/index.html")


@app.route("/api/resp")
def resp():
    from tables.models import User

    arr = [user for user in User.query.all()]
    return {"str": f" {arr}this is server render!"}


from api.signup import SignUp
from api.signin import SignIn
from api.user import User

api.add_resource(SignUp, "/signup")
api.add_resource(SignIn, "/signin")
api.add_resource(User, "/user/<user_id>")
