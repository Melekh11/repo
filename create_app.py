from flask import Flask


def create_app(config_obj):
    app = Flask(__name__)
    app.config.from_object(config_obj)

    from tables.models import db

    db.init_app(app)

    return app, db
