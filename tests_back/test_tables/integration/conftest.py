from create_app import create_app
from test_app_config import Config
import pytest
from tables.models import User, Organization, Position, Post, Review
from faker import Faker
import datetime

fake = Faker()


@pytest.fixture(scope="module")
def test_db():
    app, db = create_app(Config)
    app.app_context().push()
    db.create_all()

    # создаём тестовые данные по такому сценарию:
    # создаём 4 пользователя, 2 организации

    users = [
        (user["name"].split()[0], user["name"].split()[1], user["username"], user["mail"], fake.password())
        for user in [fake.simple_profile() for _ in range(4)]]

    for user in users:
        u = User(name=user[0], surname=user[1], login=user[2], email=user[3])
        u.set_password(user[4])
        db.session.add(u)
    db.session.commit()

    organizations = [(fake.name(), fake.text()) for _ in range(2)]

    for org in organizations:
        db.session.add(Organization(name=org[0], contacts=org[1]))
    db.session.commit()

    # первые 2 пользователя - админы первых друх организаций
    # 3-й и 4-й пользователи работают на 1-ю и 2-ю организации соответсвенно как участники
    # первый пользовтель помимо админа 1-й организации раюотает во 2-й как участник
    positions = [[1, 1, "moder"], [2, 2, "moder"], [3, 1, "user"], [4, 2, "user"], [1, 2, "user"]]

    for pos in positions:
        db.session.add(Position(user_id=pos[0], org_id=pos[1], status=pos[2]))
    db.session.commit()

    # выложим 4 поста: по 2 для каждой организации
    posts = [[(fake.name(), datetime.date(year=int(fake.date().split("-")[0]), month=int(fake.date().split("-")[1]),
                                          day=int(fake.date().split("-")[2])),
               fake.text(), fake.text()) for _ in range(2)] for __ in range(2)]
    for post in posts[0]:
        db.session.add(Post(name=post[0], date_start=post[1], short_desc=post[2], help_desc=post[3], id_org=1))
    for post in posts[1]:
        db.session.add(Post(name=post[0], date_start=post[1], short_desc=post[2], help_desc=post[3], id_org=2))
    db.session.commit()

    # добавим ревью для теста
    # на 1-й пост
    rev = Review(fake.text(), "ok", fake.text(), 1)
    db.session.add(rev)
    db.session.commit()

    data = {"users": users, "organizations": organizations, "positions": positions, "posts": posts,
            "users_of_orgs": {1: [1, 3],  2: [1, 2, 4]}, "review": 1}
    yield {"test_db": db, "data": data}
    db.session.remove()
    db.drop_all()

    # python -m pytest tests_back/test_tables/integration
