from flask_restful import Resource
from tables.models import Post
from flask_restful.reqparse import RequestParser as ReqPars
from datetime import date, timedelta
from back_utils.sql_error_decorator import sqlalchemy_decorator
from database import db

parser = ReqPars()
parser.add_argument("name", type=str, required=True, help="missing login atr")
parser.add_argument(
    "date_start", type=str, required=True, help="missing date_start atr"
)
parser.add_argument(
    "delta_time", type=int, required=True, help="missing delta_time atr"
)
parser.add_argument(
    "short_desc", type=str, required=True, help="missing short_desc atr"
)
parser.add_argument("help_desc", type=str, required=True, help="missing help_desc atr")
parser.add_argument("id_org", type=int, required=True, help="missing id_org atr")
parser.add_argument("id_org_private", type=int)


class CreatePost(Resource):
    @sqlalchemy_decorator
    def post(self):
        args = parser.parse_args()
        date_start_l = args["date_start"].split("-")
        date_start = date(
            day=int(date_start_l[2]),
            month=int(date_start_l[1]),
            year=int(date_start_l[0]),
        )
        post = Post(
            name=args["name"],
            date_start=date_start,
            delta_time=timedelta(days=args["delta_time"]),
            short_desc=args["short_desc"],
            help_desc=args["help_desc"],
            id_org=args["id_org"],
        )
        if args["id_org_private"] != "":
            post.id_org_private = args["id_org_private"]
        db.session.add(post)
        db.session.commit()
        return post.serialize(), 201
