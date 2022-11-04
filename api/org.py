from flask_restful import Resource
from tables.__all_models import Organization as Org


# класс API для получения / удаления организации
class Organization(Resource):
    def get(self, id):
        org = Org.query.filter(Org.id == id).first()
        if org:
            return org.serialize(), 200
        else:
            return {"ans": "no org with id {}".format(id)}, 403

    def delete(self, id):
        org = Org.query.filter(Org.id == id).first()
        if org:
            Org.query.filter(Org.id == id).delete()
            return {"ans": "success"}, 200
        else:
            return {"ans": "no org with id {}".format(id)}, 403
