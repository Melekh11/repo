from flask_restful import Resource
from tables.__all_models import Post as TablePost
from back_utils.delete_old_posts import delete_old_posts
from database import db


class Post(Resource):
    """класс API для получения/ удаления поста"""

    def get(self, id):
        """
        :param id: post id
        """

        post = TablePost.query.filter(TablePost.id == id).first()
        if post:
            return post.serialize(), 200
        else:
            return {"ans": "there is no post with id {}".format(id)}, 403

    def delete(self, id):
        """
        :param id: post id
        """
        post = TablePost.query.filter(TablePost.id == id).first()
        if post:
            TablePost.query.filter(TablePost.id == id).delete()
            db.session.commit()
            return {"ans": "success"}, 200
        else:
            return {"ans": "there is no post with id {}".format(id)}, 403


class Posts(Resource):
    """класс API для получения всех постов"""

    def get(self):
        delete_old_posts()
        return [post.serialize() for post in TablePost.query.all()], 200
