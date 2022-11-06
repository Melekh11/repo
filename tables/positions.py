from database import db
from tables.organisations import Organisation
from tables.users import User

POSITIONS = ("user", "moder")


class Position(db.Model):
    """класс позиции, в бд связует many-to-many User и Organization"""

    __tablename__ = "positions"
    __table_args__ = (db.PrimaryKeyConstraint("user_id", "org_id"),)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), unique=False)
    org_id = db.Column(db.Integer, db.ForeignKey("organisations.id"), unique=False)
    status = db.Column(db.String(10))

    def __init__(self, user_id, org_id, status, **kwargs):
        """
        создание позиции
        :param user_id: id пользователя статуса
        :param org_id: id организации статуса
        :param status: значение статуса
        :param kwargs: неименованные аргументы
        """

        super().__init__(**kwargs)

        if status not in POSITIONS:
            raise ValueError(f"mismatch {status} not in {POSITIONS} ")
        self.user_id = user_id
        self.org_id = org_id
        self.status = status

    def __repr__(self):
        """представление экземпляра класса"""
        return f"<Pos org_id:{self.org_id} user_id: {self.user_id}>"

    def get_user(self):
        """
        получение пользователя по self.user_id
        :return: User
        """
        return User.query.filter(User.id == self.user_id).first()

    def get_org(self):
        """
        получение организации по self.org_id
        :return: Organization
        """
        return Organisation.query.filter(Organisation.id == self.org_id).first()
