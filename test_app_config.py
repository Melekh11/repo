import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    """настройка конфига flask приложения под тесты"""

    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL"
    ) or "sqlite:///" + os.path.join(basedir, "test_app.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    TESTING = True
