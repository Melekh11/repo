from datetime import date

from database import db
from tables.models import Post


# удаление старых постов
def delete_old_posts():
    all_posts = Post.query.all()
    for post in all_posts:
        if date.today() - post.date_start > post.delta_time:
            Post.query.filter(Post == post.id).delete()
    db.session.commit()
