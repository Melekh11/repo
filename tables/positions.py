from database import db
from tables.organizations import Organization
from tables.users import User

POSITIONS = ("user", "moder")


# класс позиции, в бд связует many-to-many User и Organization
class Position(db.Model):
    __tablename__ = "positions"
    __table_args__ = (db.PrimaryKeyConstraint("user_id", "org_id"),)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), unique=False)
    org_id = db.Column(db.Integer, db.ForeignKey("organizations.id"), unique=False)
    status = db.Column(db.String(10))

    def __init__(self, user_id, org_id, status, **kwargs):
        super().__init__(**kwargs)

        if status not in POSITIONS:
            raise ValueError(f"mismatch {status} not in {POSITIONS} ")
        self.user_id = user_id
        self.org_id = org_id
        self.status = status

    def __repr__(self):
        return f"<Pos org_id:{self.org_id} user_id: {self.user_id}>"

    def get_user(self):
        return User.query.filter(User.id == self.user_id).first()

    def get_org(self):
        return Organization.query.filter(Organization.id == self.org_id).first()
