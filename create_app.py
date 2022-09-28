from flask import Flask
from flask_marshmallow import Marshmallow


def create_app(config_obj):
    app = Flask(__name__)
    app.config.from_object(config_obj)

    # from tables.models import db
    from database import init_db
    from tables.schemas import init_ma

    init_db(app)
    init_ma(app)

    return app


from tables import models
