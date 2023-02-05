from database import db


class Review(db.Model):
    """класс ответов на посты в таблицах бд"""

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
        """
        :param args: неименованные аргументы, данные ответа
        :param kwargs: именованные аргументы
        """
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

    def serialize(self):
        """
        сериализация для отправки по HTTP
        :return: dict
        """
        return {
            "id": self.id,
            "help_desc": self.help_desc,
            "make_better_desc": self.make_better_desc,
            "time_option": self.time_option,
            "contacts": self.contacts,
            "id_post": self.id_post,
            "org_name": self.post.org.name,
            "org_id": self.post.org.id,
            "post_name": self.post.name,
        }
