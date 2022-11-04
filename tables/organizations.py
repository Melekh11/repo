from database import db


# класс организации в таблицах бд
class Organization(db.Model):
    __tablename__ = "organizations"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(30), nullable=False, unique=True)
    contacts = db.Column(db.Text, nullable=False)

    posts = db.relationship("Post", backref="org", lazy="dynamic")
    participants = db.relationship("Position", backref="org", lazy="dynamic")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "contacts": self.contacts,
            "posts": [post.id for post in self.posts],
            "participants": [position.user_id for position in self.participants],
        }
