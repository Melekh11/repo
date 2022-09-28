from faker import Faker
from back_utils.data_generator import create_users
from database import db

fake = Faker()


def test_api(front_client):
    resp = front_client.get("/")
    assert resp.status_code == 200


def test_signup(front_client):
    password = fake.password()
    user = create_users()
    user.set_password(password)

    resp = front_client.post(
        "http://127.0.0.1:5000/test/signup",
        json={
            "name": user.name,
            "surname": user.surname,
            "login": user.login,
            "email": user.email,
            "password": password,
            "is_testing": True,
        },
    )

    resp_json = resp.json

    assert resp.status_code == 201
    assert resp_json["name"] == user.name
    assert resp_json["surname"] == user.surname
    assert resp_json["login"] == user.login

    resp2 = front_client.post(
        "/test/signup",
        json={
            "name": user.name,
            "surname": user.surname,
            "login": user.login,
            "email": user.email,
            "password": password,
        },
    )

    assert resp2.status_code == 406
    assert resp2.json == "existed user"


def test_signin(front_client):
    password = fake.password()
    user = create_users()

    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    resp = front_client.post(
        "/test/signin", json={"login": user.login, "password": password}
    )

    resp_json = resp.json

    assert resp.status_code == 202
    assert resp_json["name"] == user.name
    assert resp_json["surname"] == user.surname

    resp2 = front_client.post(
        "/test/signin", json={"login": user.login, "password": password + "wrong"}
    )

    assert resp2.status_code == 401
    assert resp2.text == '"wrong password"\n'

    resp2 = front_client.post(
        "/test/signin", json={"login": user.login + "wrong!", "password": password}
    )

    assert resp2.status_code == 406
    assert resp2.json == f"no user with login {user.login+'wrong!'}"


def test_get_user(front_client):
    user = create_users()

    db.session.add(user)
    db.session.commit()

    resp = front_client.get("/test/user/1")

    assert resp.status_code == 200
    assert resp.json["name"] == user.name
    assert resp.json["surname"] == user.surname

    resp = front_client.get("/test/user/10")

    assert resp.status_code == 404
    assert resp.json == "there is no user with id 10"

    user2 = create_users()
    password = fake.password()

    resp_patch = front_client.patch(
        "/test/user/1",
        json={
            "name": user2.name,
            "surname": user2.surname,
            "login": user2.login,
            "email": user2.email,
            "password": password,
        },
    )

    assert resp_patch.status_code == 200
    assert resp_patch.json["name"] == user2.name
    assert resp_patch.json["login"] == user2.login

    resp_patch2 = front_client.patch(
        "/test/user/1",
        json={
            "name": user2.name,
            "surname": user2.surname,
            "login": user2.login,
            "password": password,
        },
    )

    assert resp_patch2.status_code == 406
    assert resp_patch2.json == "existed user"
