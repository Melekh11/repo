import os

from flask import send_from_directory

from app_config import Config
from flask_migrate import Migrate
from create_app import create_app
from flask_restful import Api
from database import db

app = create_app(Config)
api = Api(app)
migrate = Migrate(app, db)


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):

    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")


# # настройка выдачи статики
# @app.route("/")
# def index():
#     return flask.send_from_directory(os.path.join("front", "build"), "index.html")


from api.signup import SignUp
from api.signin import SignIn
from api.user import User
from api.create_org import CreateOrganization
from api.create_post import CreatePost
from api.add_user import AddUser
from api.post import Post, Posts
from api.review import Review, Reviews
from api.create_review import CreateReview
from api.org import Organisation, Organisations

# добавление api ручек
api.add_resource(SignUp, "/signup")
api.add_resource(SignIn, "/signin")
api.add_resource(User, "/user/<user_id>")
api.add_resource(CreateOrganization, "/org")
api.add_resource(CreatePost, "/post")
api.add_resource(AddUser, "/add-user")
api.add_resource(Posts, "/posts")
api.add_resource(Post, "/post/<id>")
api.add_resource(CreateReview, "/review")
api.add_resource(Review, "/review/<id>")
api.add_resource(Reviews, "/reviews")
api.add_resource(Organisation, "/org/<id>")
api.add_resource(Organisations, "/orgs")


# запуск приложения
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, use_reloader=True, threaded=True)
