from flask_sqlalchemy import SQLAlchemy

from back_utils.create_statuses import create_statuses

db = SQLAlchemy()


def init_db(app, Status):
    """привязка базы данных к приложению и создание статусов"""

    with app.app_context():
        db.init_app(app)
        db.create_all()

        create_statuses(db, Status)
