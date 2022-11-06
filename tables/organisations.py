from database import db


class Organisation(db.Model):
    """класс организации в таблицах бд"""

    __tablename__ = "organisations"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(30), nullable=False, unique=True)
    contacts = db.Column(db.Text, nullable=False)

    posts = db.relationship("Post", backref="org", lazy="dynamic")
    participants = db.relationship("Position", backref="org", lazy="dynamic")

    def serialize(self):
        """
        сериализация для отправки по HTTP
        :return: dict
        """
        return {
            "id": self.id,
            "name": self.name,
            "contacts": self.contacts,
            "posts": [
                {"id": post.id, "name": post.name, "desc": post.short_desc}
                for post in self.posts
            ],
            "participants": [position.user_id for position in self.participants],
        }
