from flask_restful import Resource
from back_utils.helpers import get_org_by_name
from tables.__all_models import Post
from flask_restful.reqparse import RequestParser as ReqPars
from datetime import date, timedelta
from back_utils.sql_error_decorator import sqlalchemy_decorator
from database import db

parser = ReqPars()
parser.add_argument("name", type=str, required=True, help="missing name atr")
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
parser.add_argument("org_name", type=str, required=True, help="missing org_name atr")
parser.add_argument("org_private_name", type=str)


class CreatePost(Resource):
    """класс API для добавления поста организации"""

    @sqlalchemy_decorator
    def post(self):
        args = parser.parse_args()
        date_start_l = args["date_start"].split("-")
        date_start = date(
            day=int(date_start_l[2]),
            month=int(date_start_l[1]),
            year=int(date_start_l[0]),
        )
        org = get_org_by_name(args["org_name"])
        if org is None:
            return f"there is no org with name '{args['org_name']}'", 404

        post = Post(
            name=args["name"],
            date_start=date_start,
            delta_time=timedelta(days=args["delta_time"]),
            short_desc=args["short_desc"],
            help_desc=args["help_desc"],
            id_org=org.id,
        )
        if args["org_private_name"] is not None and args["org_private_name"] != "":
            org_private = get_org_by_name(args["org_private_name"])
            if org_private is not None:
                post.id_org_private = org_private.id
            else:
                return f"there is no org with name '{args['org_private_name']}'", 400
        db.session.add(post)
        db.session.commit()
        return post.serialize(), 201
