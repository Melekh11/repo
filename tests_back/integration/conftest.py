from back_utils.data_generator import (
    create_users,
    create_org,
    create_position,
    create_post,
    create_review,
)
from create_app import create_app
from test_app_config import Config
from flask_restful import Api
from database import db
from faker import Faker
import pytest


fake = Faker()


@pytest.fixture()
def front_client():
    """
    создаём тестовое приложение и фейк клиента
    после завершения работы удаляем все данные из фейковой таблицы
    :return: тестовый клиент
    """
    app = create_app(Config)
    app.app_context().push()
    db.create_all()

    db.session.remove()

    api = Api(app)
    from api.signup import SignUp
    from api.signin import SignIn
    from api.user import User
    from api.create_org import CreateOrganization as CreateOrg
    from api.org import Organisation
    from api.create_post import CreatePost
    from api.post import Post
    from api.add_user import AddUser

    api.add_resource(SignUp, "/test/signup")
    api.add_resource(SignIn, "/test/signin")
    api.add_resource(User, "/test/user/<user_id>")
    api.add_resource(CreateOrg, "/test/org")
    api.add_resource(Organisation, "/test/org/<id>")
    api.add_resource(CreatePost, "/test/post")
    api.add_resource(Post, "/test/post/<id>")
    api.add_resource(AddUser, "/test/add-user")

    yield app.test_client()

    db.session.remove()
    db.drop_all()


@pytest.fixture(scope="module")
def test_db():
    """создаём тестовое приложение и вносим в бд данные для тестов"""

    app = create_app(Config)
    app.app_context().push()
    db.create_all()

    db.session.remove()

    # создаём тестовые данные по такому сценарию:
    # создаём 4 пользователя, 2 организации

    users = create_users(4)
    organizations = create_org(2)

    for user in users:
        db.session.add(user)
    db.session.commit()

    for org in organizations:
        db.session.add(org)
    db.session.commit()

    # первые 2 пользователя - админы первых друх организаций
    # 3-й и 4-й пользователи работают на 1-ю и 2-ю организации соответсвенно как участники
    # первый пользовтель помимо админа 1-й организации раюотает во 2-й как участник
    positions = [
        create_position(users[0], organizations[0], "moder"),
        create_position(users[1], organizations[1], "moder"),
        create_position(users[2], organizations[0], "moder"),
        create_position(users[3], organizations[1], "moder"),
        create_position(users[0], organizations[1], "user"),
    ]

    for pos in positions:
        db.session.add(pos)
    db.session.commit()

    # выложим 4 поста: по 2 для каждой организации
    posts = []

    for i in range(2):
        for _ in range(2):
            posts.append(create_post(organizations[i].id))

    # и один персонально для второй организации от первой
    posts.append(create_post(organizations[0].id, id_private=organizations[1].id))

    for post in posts:
        db.session.add(post)

    db.session.commit()

    # добавим ревью для теста
    # на 1-й пост
    rev = create_review(posts[0].id, "ok")
    db.session.add(rev)
    db.session.commit()

    data = {
        "users_of_orgs": {1: [1, 3], 2: [1, 2, 4]},
        "review": 1,
        "posts_of_org": {1: [1, 2, 5], 2: [3, 4]},
    }

    yield data

    db.session.remove()
    db.drop_all()

    # python -m pytest tests_back/integration
