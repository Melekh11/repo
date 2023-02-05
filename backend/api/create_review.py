from flask_restful import Resource

from back_utils.sql_error_decorator import sqlalchemy_decorator
from tables.__all_models import Review as TableReview
from flask_restful.reqparse import RequestParser as ReqPars
from database import db

parser = ReqPars()
parser.add_argument("id_post", type=int)
parser.add_argument("help_desc", type=str)
parser.add_argument("contacts", type=str)
parser.add_argument("time_option", type=str)
parser.add_argument("make_better_desc", type=str)


class CreateReview(Resource):
    @sqlalchemy_decorator
    def post(self):
        args = parser.parse_args()
        review = TableReview(
            help_desc=args["help_desc"],
            time_option=args["time_option"],
            contacts=args["contacts"],
            id_post=args["id_post"],
            make_better_desc=args["make_better_desc"],
        )
        db.session.add(review)
        db.session.commit()
        return review.serialize(), 201
