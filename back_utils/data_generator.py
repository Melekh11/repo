import datetime
from faker import Faker
from tables.__all_models import User, Organisation, Position, Post, Review

fake = Faker()


def create_users(n=1):
    """
    создаёт экземпляры класса User c фейковыми данными
    :param n: кол-во пользователей
    :return: User[]
    """
    data_users = [
        (
            user["name"].split()[0],
            user["name"].split()[1],
            user["username"],
            user["mail"],
            fake.password(),
        )
        for user in [fake.simple_profile() for _ in range(n)]
    ]
    users = list(
        map(
            lambda user: User(
                name=user[0], surname=user[1], login=user[2], email=user[3]
            ),
            data_users,
        )
    )
    for i in range(len(users)):
        users[i].set_password(data_users[i][4])

    if n == 1:
        return users[0]
    return users


def create_org(n=1):
    """
    создаёт экземпляры класса Organization c фейковыми данными
    :param n: кол-во организаций
    :return: Organization[]
    """
    if n == 1:
        return Organisation(name=fake.name(), contacts=fake.text())
    return list(
        map(
            lambda org: Organisation(name=org[0], contacts=org[1]),
            [(fake.name(), fake.text()) for _ in range(n)],
        )
    )


def create_position(user, org, status):
    """
    создаёт экземпляр класса Position
    :param user: экземпляр класса User
    :param org: экземпляр класса Organization
    :param status: статусс пользователя в проекте
    :return: Position
    """
    return Position(user_id=user.id, org_id=org.id, status=status)


def create_post(id_org, id_private=-1):
    """
    создаёт экземпляры класса Post c фейковыми данными
    :param id_org: id организации
    :param id_private: id оргнаизации для приватного приглашения
    :return: Post
    """
    data_post = [
        fake.name(),
        datetime.date(
            year=int(fake.date().split("-")[0]),
            month=int(fake.date().split("-")[1]),
            day=int(fake.date().split("-")[2]),
        ),
        fake.text(),
        fake.text(),
    ]

    post = Post(
        name=data_post[0],
        date_start=data_post[1],
        short_desc=data_post[2],
        help_desc=data_post[3],
        delta_time=datetime.timedelta(days=30),
        id_org=id_org,
    )

    if id_private > 0:
        post.id_org_private = id_private

    return post


def create_review(id_post, time_option):
    """
    создаёт экземпляры класса Post c фейковыми данными
    :param id_post: id поста
    :param time_option: подходит ли установленное время
    :return: Review
    """
    return Review(fake.text(), time_option, fake.text(), id_post, fake.text())
