from flask_restful import Resource

from database import db
from tables.__all_models import Organisation as Org
from tables.positions import Position


class Organisation(Resource):
    """класс API для получения / удаления организации"""

    def get(self, id):
        """
        :param id: organization id
        """

        org = Org.query.filter(Org.id == id).first()
        if org:
            return org.serialize(), 200
        else:
            return {"ans": "no org with id {}".format(id)}, 403

    def delete(self, id):
        """
        :param id: organization id
        """

        org = Org.query.filter(Org.id == id).first()
        if org:
            for position in org.participants:
                position.delete()
            for post in org.posts:
                for review in post.reviews:
                    review.delete()
                post.delete()
            Org.query.filter(Org.id == id).delete()
            db.session.commit()
            return {"ans": "success"}, 200
        else:
            return {"ans": "no org with id {}".format(id)}, 403


class Organisations(Resource):
    """класс API для получения всех организаций"""

    def get(self):
        return [org.serialize() for org in Org.query.all()], 200
