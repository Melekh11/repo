from flask_restful import Resource

from database import db
from tables.__all_models import Review as TableReview


class Reviews(Resource):
    def get(self):
        return [review.serialize() for review in TableReview.query.all()], 200


class Review(Resource):
    def get(self, id):
        review = TableReview.query.filter(TableReview.id == id).first()
        if review:
            return review.serialize(), 200
        else:
            return {"ans": "there is no post with id {}".format(id)}, 403

    def delete(self, id):
        review = TableReview.query.filter(TableReview.id == id).first()
        if review:
            TableReview.query.filter(TableReview.id == id).delete()
            db.session.commit()
            return {"ans": "success"}, 200
        else:
            return {"ans": "there is no post with id {}".format(id)}, 403
