from flask_restful import Resource
from tables.__all_models import Organisation
from flask_restful.reqparse import RequestParser as ReqPars
from back_utils.helpers import check_unique_org
from back_utils.sql_error_decorator import sqlalchemy_decorator
from database import db

parser = ReqPars()
parser.add_argument("name", type=str, required=True, help="missing login atr")
parser.add_argument("contacts", type=str, required=True, help="missing password atr")


class CreateOrganization(Resource):
    """класс API для создания организаций"""

    @sqlalchemy_decorator
    def post(self):
        args = parser.parse_args()
        if check_unique_org(args["name"]):
            org = Organisation(name=args["name"], contacts=args["contacts"])
            db.session.add(org)
            db.session.commit()
            return org.serialize(), 201
        else:
            return "org {} already exist".format(args["name"]), 406
