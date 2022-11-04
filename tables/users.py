from database import db
from werkzeug.security import generate_password_hash, check_password_hash


# класс пользователя в таблицах БД
class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(30), nullable=False)
    surname = db.Column(db.String(30), nullable=False)
    login = db.Column(db.String(30), unique=True, index=True, nullable=False)
    email = db.Column(db.String(120), unique=True)
    password_hash = db.Column(db.String(128))

    positions = db.relationship("Position", backref="user", lazy="dynamic")

    def __repr__(self):
        return f"<User {self.id}>"

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "surname": self.surname,
            "login": self.login,
            "email": self.email,
            "positions": [
                {"status": pos.status, "org": pos.get_org().name}
                for pos in self.positions
            ],
        }
