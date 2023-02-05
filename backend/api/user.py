from flask_restful import Resource
from back_utils.helpers import get_user_by_id, check_unique_login
from flask_restful.reqparse import RequestParser as ReqPars
from back_utils.sql_error_decorator import sqlalchemy_decorator
from database import db

parser = ReqPars()
parser.add_argument("name", type=str)
parser.add_argument("surname", type=str)
parser.add_argument("login", type=str)
parser.add_argument("email", type=str)
parser.add_argument("password", type=str)


class User(Resource):
    """класс API для работы с пользователем"""

    def get(self, user_id):
        """
        :param user_id: iser id
        """
        user = get_user_by_id(user_id)
        if user:
            return user.serialize(), 200
        else:
            return f"there is no user with id {user_id}", 403

    @sqlalchemy_decorator
    def patch(self, user_id):
        """
        :param user_id: iser id
        """
        args = parser.parse_args()
        user = get_user_by_id(user_id)
        if user:
            if args["password"] is not None and args["password"] != "":
                if user.check_password(args["password"]):
                    return "you use the same password", 400
                user.set_password(args["password"])
                db.session.commit()

            if check_unique_login(args["login"]):
                user.name = args["name"]
                user.surname = args["surname"]
                user.login = args["login"]
                user.email = args["email"]
                db.session.commit()
                return user.serialize(), 200
            else:
                return "existed user", 406
        else:
            return "there is no user with id {}".format(id), 404
