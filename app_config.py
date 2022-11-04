import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    """настройка конфига flask приложения под production"""

    SECRET_KEY = os.environ.get("SECRET_KEY") or "gum_matinfo_luchshie17"
    static_folder = "test_front/build"
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL"
    ) or "sqlite:///" + os.path.join(basedir, "app.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
