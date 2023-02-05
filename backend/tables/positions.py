from database import db
from tables.organizations import Organization
from tables.users import User

POSITIONS = ("user", "moder")


class Position(db.Model):
    """класс позиции, в бд связует many-to-many User и Organization"""

    __tablename__ = "positions"
    __table_args__ = (db.PrimaryKeyConstraint("user_id", "org_id", "status_id"),)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), unique=False)
    org_id = db.Column(db.Integer, db.ForeignKey("organizations.id"), unique=False)
    status_id = db.Column(db.Integer, db.ForeignKey("statuses.id"))

    # def __repr__(self):
    #     """представление экземпляра класса"""
    #     return f"<Pos org_id:{self.org_id} user_id: {self.user_id}>"

    # def get_user(self):
    #     """
    #     получение пользователя по self.user_id
    #     :return: User
    #     """
    #     return User.query.filter(User.id == self.user_id).first()

    # def get_org(self):
    #     """
    #     получение организации по self.org_id
    #     :return: Organization
    #     """
    #     return Organisation.query.filter(Organisation.id == self.org_id).first()
