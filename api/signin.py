from flask_restful import Resource
from flask_restful.reqparse import RequestParser as ReqPars
from back_utils.helpers import get_user_by_login

parser = ReqPars()
parser.add_argument("login", type=str, required=True, help="missing login atr")
parser.add_argument("password", type=str, required=True, help="missing password atr")


class SignIn(Resource):
    """класс API для логина"""

    def post(self):
        args = parser.parse_args()
        user = get_user_by_login(args["login"])
        if user:
            if user.check_password(args["password"]):
                return user.serialize(), 202
            else:
                return "wrong password", 401
        else:
            return "no user with login {}".format(args["login"]), 406
