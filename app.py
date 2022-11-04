import os
from app_config import Config
from flask_migrate import Migrate
from create_app import create_app
from flask_restful import Api
from database import db

app = create_app(Config)
api = Api(app)
migrate = Migrate(app, db)


# настройка выдачи статики
@app.route("/")
def index():
    root_dir = os.path.dirname(os.getcwd())
    return os.path.join(root_dir, "test_front", "build")


from api.signup import SignUp
from api.signin import SignIn
from api.user import User
from api.create_org import CreateOrganization
from api.create_post import CreatePost
from api.add_user import AddUser

# добавление api ручек
api.add_resource(SignUp, "/signup")
api.add_resource(SignIn, "/signin")
api.add_resource(User, "/user/<user_id>")
api.add_resource(CreateOrganization, "/org")
api.add_resource(CreatePost, "/post")
api.add_resource(AddUser, "/add-user")


# запуск приложения
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
