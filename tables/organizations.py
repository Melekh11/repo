from main import db


class Organization(db.Model):
    __tablename__ = "organizations"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)
    contacts = db.Column(db.Text, nullable=False)

    posts = db.relationship("Post", backref="org", lazy='dynamic')
    participants = db.relationship("Position", backref="org", lazy="dynamic")

