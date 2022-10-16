from flask import Flask


def create_app(config_obj):
    app = Flask(__name__)
    app.config.from_object(config_obj)

    from database import init_db

    init_db(app)

    return app


from tables import models
