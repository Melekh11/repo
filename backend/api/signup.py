from flask_restful import Resource
from flask_restful.reqparse import RequestParser as ReqPars
from back_utils.sql_error_decorator import sqlalchemy_decorator
from back_utils.helpers import check_unique_user
from tables.__all_models import User
from database import db

parser = ReqPars()
parser.add_argument("name", type=str, required=True, help="missing name atr")
parser.add_argument("surname", type=str, required=True, help="missing surname atr")
parser.add_argument("login", type=str, required=True, help="missing login atr")
parser.add_argument("email", type=str, required=True, help="missing email atr")
parser.add_argument("password", type=str, required=True, help="missing password atr")


class SignUp(Resource):
    """класс API для регистарции пользователей"""

    @sqlalchemy_decorator
    def post(self):
        args = parser.parse_args()

        if check_unique_user(args["login"], args["email"]):
            user = User(
                name=args["name"],
                surname=args["surname"],
                login=args["login"],
                email=args["email"],
            )
            user.set_password(args["password"])
            db.session.add(user)
            db.session.commit()
            return user.serialize(), 201
        else:
            return "existed user", 406
