from tables.__all_models import User, Organisation, Post
import pytest
import datetime
from faker import Faker

fake = Faker()

test_users = [
    (
        user["name"].split()[0],
        user["name"].split()[1],
        user["username"],
        user["mail"],
        fake.password(),
    )
    for user in [fake.simple_profile() for _ in range(10)]
]

test_organizations = [(fake.name(), fake.text()) for _ in range(10)]

test_posts = [
    (
        fake.name(),
        datetime.date(
            year=int(fake.date().split("-")[0]),
            month=int(fake.date().split("-")[1]),
            day=int(fake.date().split("-")[2]),
        ),
        fake.text(),
        fake.text(),
    )
    for _ in range(10)
]


@pytest.mark.parametrize("name, surname, login, email, password", test_users)
def test_add_use(name, surname, login, email, password):
    user = User(name=name, surname=surname, login=login, email=email)
    user.set_password(password)
    assert user.name == name
    assert user.surname == surname
    assert user.login == login
    assert user.email == email
    assert user.check_password(password)


@pytest.mark.parametrize("name, contacts", test_organizations)
def test_add_org(name, contacts):
    org = Organisation(name=name, contacts=contacts)
    assert org.contacts == contacts
    assert org.name == name


@pytest.mark.parametrize("name, date_start, short_desc, help_desc", test_posts)
def test_app_post(name, date_start, short_desc, help_desc):
    post = Post(
        name=name, date_start=date_start, short_desc=short_desc, help_desc=help_desc
    )
    assert post.date_start == date_start
    assert post.name == name
    assert post.short_desc == short_desc
    assert post.help_desc == help_desc
