from app import db
import datetime


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

    def __repr__(self):
        return f'<Post {self.id} {self.name}>'
