from database import db


class Status(db.Model):
    __tablename__ = "statuses"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    status_name = db.Column(db.String(30), nullable=False)

    participants = db.relationship("Position", backref="status", lazy="dynamic")
