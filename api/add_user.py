from flask_restful import Resource
from flask_restful.reqparse import RequestParser as ReqPars
from back_utils.helpers import (
    check_user_by_login,
    get_user_by_login,
    get_org_by_name,
    check_org_by_name,
)
from back_utils.sql_error_decorator import sqlalchemy_decorator
from database import db
from tables.__all_models import Position

parser = ReqPars()
parser.add_argument(
    "user_login", type=str, required=True, help="missing user_login atr"
)
parser.add_argument("org_name", type=str, required=True, help="missing org_name atr")
parser.add_argument("status", type=str, required=True, help="missing status atr")


# класс API для добавления позиции пользователю
class AddUser(Resource):
    @sqlalchemy_decorator
    def post(self):
        args = parser.parse_args()
        login = args["user_login"]
        org_name = args["org_name"]
        if check_user_by_login(login) and check_org_by_name(org_name):
            user = get_user_by_login(login)
            org = get_org_by_name(org_name)
            if org.id not in list(
                map(lambda position: position.org_id, user.positions)
            ):
                try:
                    pos = Position(user.id, org.id, args["status"])
                    db.session.add(pos)
                    db.session.commit()
                    return {"org": org.serialize(), "user": user.serialize()}, 201
                except ValueError:
                    return {"ans": "wrong position status"}, 400
            else:
                return {"ans": "position already exist"}, 400
        else:
            return {"ans": "wrong login or password"}, 400
