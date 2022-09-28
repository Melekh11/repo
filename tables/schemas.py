from flask_marshmallow import Marshmallow
from tables.models import User

ma = Marshmallow()


def init_ma(app):
    with app.app_context():
        ma.init_app(app)


class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User

    id = ma.auto_field()
    name = ma.auto_field()
    surname = ma.auto_field()
    login = ma.auto_field()
    email = ma.auto_field()
