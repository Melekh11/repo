from database import db
from werkzeug.security import generate_password_hash, check_password_hash
import datetime


POSITIONS = ("user", "moder")


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(30), nullable=False)
    surname = db.Column(db.String(30), nullable=False)
    login = db.Column(db.String(30), unique=True, index=True, nullable=False)
    email = db.Column(db.String(120), unique=True)
    password_hash = db.Column(db.String(128))

    position = db.relationship("Position", backref="user", lazy="dynamic")

    def __repr__(self):
        return f"<User {self.id}>"

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Organization(db.Model):
    __tablename__ = "organizations"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(30), nullable=False)
    contacts = db.Column(db.Text, nullable=False)

    posts = db.relationship("Post", backref="org", lazy="dynamic")
    participants = db.relationship("Position", backref="org", lazy="dynamic")


class Post(db.Model):
    __tablename__ = "posts"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    date_publish = db.Column(db.Date, default=datetime.date.today)
    date_start = db.Column(db.Date, nullable=False)
    delta_time = db.Column(db.Interval, default=datetime.timedelta(days=30))
    short_desc = db.Column(db.Text(300), nullable=False)
    help_desc = db.Column(db.Text(300), nullable=False)

    id_org = db.Column(db.Integer, db.ForeignKey("organizations.id"))
    id_org_private = db.Column(db.Integer, default=0)

    reviews = db.relationship("Review", backref="post", lazy="dynamic")

    def org_private(self):
        if self.id_org_private == 0:
            return None
        return Organization.query.filter(Organization.id == self.id_org_private).first()

    def __repr__(self):
        return f"<Post {self.id} {self.name}>"


class Position(db.Model):
    __tablename__ = "positions"
    __table_args__ = (db.PrimaryKeyConstraint("user_id", "org_id"),)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), unique=False)
    org_id = db.Column(db.Integer, db.ForeignKey("organizations.id"), unique=False)
    status = db.Column(db.String(10))

    def __init__(self, user_id, org_id, status, **kwargs):
        super(Position, self).__init__(**kwargs)

        if status not in POSITIONS:
            raise TypeError(f"mismatch {status} not in {POSITIONS} ")
        self.user_id = user_id
        self.org_id = org_id
        self.status = status

    def __repr__(self):
        return f"<Pos org_id:{self.org_id} user_id: {self.user_id}>"


class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    help_desc = db.Column(db.Text(300), nullable=False)
    make_better_desc = db.Column(db.Text(300), nullable=False)
    time_option = db.Column(db.Text(10), nullable=False)
    contacts = db.Column(db.Text(300), nullable=False)

    id_post = db.Column(db.Integer, db.ForeignKey("posts.id"))

    def __init__(
        self, help_desc, time_option, contacts, id_post, make_better_desc, **kwargs
    ):
        super(Review, self).__init__(**kwargs)

        if time_option not in ("ok", "bad", "trouble"):
            raise TypeError("impossible value if time_option var")
        self.id_post = id_post
        self.help_desc = help_desc
        self.contacts = contacts
        self.time_option = time_option
        self.make_better_desc = make_better_desc

    def __repr__(self):
        return f"<Review {self.id_post}>"
