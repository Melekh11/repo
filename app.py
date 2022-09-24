from app_config import Config
from flask_migrate import Migrate
from create_app import create_app
from flask_restful import Api
from flask_marshmallow import Marshmallow


app, db = create_app(Config)
api = Api(app)
ma = Marshmallow(app)
migrate = Migrate(app, db)


# удобное тестирование через python оболочку
@app.shell_context_processor
def make_shell_context():
    return {
        "db": db,
        "User": db.User,
        "Post": db.Post,
        "Pos": db.Position,
        "Org": db.Organization,
    }


@app.route("/")
def index():
    return "hello world"


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
