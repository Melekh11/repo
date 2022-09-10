from main import db
from sqlalchemy.types import TypeDecorator, String


class EnumPos(TypeDecorator):
    impl = String

    def process_bind_param(self, value, dialect):
        positions = ("moder", "user")
        if value in positions:
            return value
        else:
            raise TypeError(f"mismatch {value} not in {positions} ")


class Position(db.Model):
    __tablename__ = "positions"
    __table_args__ = (
        db.PrimaryKeyConstraint('user_id', 'org_id'),
    )
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    org_id = db.Column(db.Integer, db.ForeignKey('organizations.id'))
    status = db.Column(EnumPos())

    def __repr__(self):
        return f'<Pos org_id:{self.org_id} user_id: {self.user_id}>'


