from app import db


class Position(db.Model):
    __tablename__ = "positions"
    __table_args__ = (
        db.PrimaryKeyConstraint('user_id', 'org_id'),
    )
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    org_id = db.Column(db.Integer, db.ForeignKey('organizations.id'))
    status = db.Column(db.String(10))

    def __init__(self, user_id, org_id, status):
        positions = ("moder", "user")
        if status not in positions:
            raise TypeError(f"mismatch {status} not in {positions} ")
        self.user_id = user_id
        self.org_id = org_id
        self.status = status

    def __repr__(self):
        return f'<Pos org_id:{self.org_id} user_id: {self.user_id}>'


