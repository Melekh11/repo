from database import db
from tables.organisations import Organisation
import datetime


class Post(db.Model):
    """класс поста в таблицах бд"""

    __tablename__ = "posts"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    date_publish = db.Column(db.Date, default=datetime.date.today)
    date_start = db.Column(db.Date, nullable=False)
    delta_time = db.Column(db.Interval, default=datetime.timedelta(days=30))
    short_desc = db.Column(db.Text(300), nullable=False)
    help_desc = db.Column(db.Text(300), nullable=False)

    id_org = db.Column(db.Integer, db.ForeignKey("organisations.id"))
    id_org_private = db.Column(db.Integer, default=0)

    reviews = db.relationship("Review", backref="post", lazy="dynamic")

    def org_private(self):
        """
        полуение организации по self.id_org_private
        :return: Organization или None
        """
        if self.id_org_private == 0:
            return None
        return Organisation.query.filter(Organisation.id == self.id_org_private).first()

    def __repr__(self):
        """представление экземпляра класса"""
        return f"<Post {self.id} {self.name}>"

    def serialize(self):
        """
        сериализация для отправки по HTTP
        :return: dict
        """
        org_priv_name = ""
        if self.id_org_private > 0:
            org_priv_name = self.org_private().name
        return {
            "id": self.id,
            "name": self.name,
            "date_publish": str(self.date_publish),
            "date_start": str(self.date_start),
            "delta_time": str(self.delta_time),
            "short_desc": self.short_desc,
            "help_desc": self.help_desc,
            "id_org": self.id_org,
            "id_org_priv": self.id_org_private,
            "org_name": self.org.name,
            "org_priv_name": org_priv_name,
        }
