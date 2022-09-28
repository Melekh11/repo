import datetime
from faker import Faker
from tables.models import User, Organization, Position, Post, Review

fake = Faker()


def create_users(n=1):
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


def create_orgs(n):
    return list(
        map(
            lambda org: Organization(name=org[0], contacts=org[1]),
            [(fake.name(), fake.text()) for _ in range(n)],
        )
    )


def create_position(user, org, status):
    return Position(user_id=user.id, org_id=org.id, status=status)


def create_post(id_org, id_private=-1):
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
        id_org=id_org,
    )

    if id_private > 0:
        post.id_org_private = id_private

    return post


def create_review(id_post, time_option):
    return Review(fake.text(), time_option, fake.text(), id_post, fake.text())
