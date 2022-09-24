from tables.models import User
from app import ma


class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User

    id = ma.auto_field()
    name = ma.auto_field()
    surname = ma.auto_field()
    login = ma.auto_field()
    email = ma.auto_field()
