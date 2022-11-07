from faker import Faker
from back_utils.data_generator import create_users, create_org, create_post
from database import db

fake = Faker()


# python -m pytest tests_back/integration/test_api.py::test_signup
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


# python -m pytest tests_back/integration/test_api.py::test_signin
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


# python -m pytest tests_back/integration/test_api.py::test_get_user
def test_get_user(front_client):
    user = create_users()

    db.session.add(user)
    db.session.commit()

    resp = front_client.get("/test/user/1")

    assert resp.status_code == 200
    assert resp.json["name"] == user.name
    assert resp.json["surname"] == user.surname

    resp = front_client.get("/test/user/10")

    assert resp.status_code == 403
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
        },
    )

    assert resp_patch2.json == "existed user"
    assert resp_patch2.status_code == 406


# python -m pytest tests_back/integration/test_api.py::test_create_org -vv
def test_create_org(front_client):
    org = create_org()

    resp = front_client.post(
        "/test/org", json={"name": org.name, "contacts": org.contacts}
    )
    assert resp.status_code == 201
    assert resp.json["name"] == org.name
    assert resp.json["contacts"] == org.contacts


# python -m pytest tests_back/integration/test_api.py::test_posts_org
def test_posts_org(front_client):
    org = create_org()
    resp = front_client.post(
        "/test/org", json={"name": org.name, "contacts": org.contacts}
    )

    posts = [create_post(id_org=resp.json["id"]) for _ in range(5)]
    for post in posts:
        db.session.add(post)
    db.session.commit()

    org_resp = front_client.get("/test/org/{}".format(resp.json["id"]))
    assert list(map(lambda p: p["id"], org_resp.json["posts"])) == list(
        map(lambda post: post.id, posts)
    )
    assert org_resp.status_code == 200

    org_del_resp = front_client.delete("/test/org/{}".format(resp.json["id"]))
    assert org_del_resp.json["ans"] == "success"
    assert org_del_resp.status_code == 200

    id_wrong = 1e3
    org_wrong_resp = front_client.delete("/test/org/{}".format(id_wrong))
    assert org_wrong_resp.json["ans"] == "no org with id {}".format(id_wrong)
    assert org_wrong_resp.status_code == 403


# python -m pytest tests_back/integration/test_api.py::test_create_post
def test_create_post(front_client):
    fake_org = create_org()
    org_resp = front_client.post(
        "test/org", json={"name": fake_org.name, "contacts": fake_org.contacts}
    )

    assert org_resp.status_code == 201
    assert org_resp.json["id"] == 1
    assert fake_org.name is not None

    posts = [create_post(org_resp.json["id"]) for _ in range(5)]

    for post in posts:
        create_post_resp = front_client.post(
            "/test/post",
            json={
                "name": post.name,
                "date_start": str(post.date_start),
                "delta_time": int(post.delta_time.days),
                "short_desc": post.short_desc,
                "help_desc": post.help_desc,
                "org_name": org_resp.json["name"],
            },
        )

        assert create_post_resp.status_code == 201
        assert create_post_resp.json["help_desc"] == post.help_desc
        assert create_post_resp.json["id_org"] == org_resp.json["id"]


# python -m pytest tests_back/integration/test_api.py::test_create_private_post
def test_create_private_post(front_client):
    orgs = create_org(2)
    org = orgs[0]
    org_resp = front_client.post(
        "test/org", json={"name": org.name, "contacts": org.contacts}
    )

    org2 = orgs[1]
    org2_resp = front_client.post(
        "test/org", json={"name": org2.name, "contacts": org2.contacts}
    )

    post = create_post(org_resp.json["id"], org2_resp.json["id"])

    create_post_resp = front_client.post(
        "/test/post",
        json={
            "name": post.name,
            "date_start": str(post.date_start),
            "delta_time": int(post.delta_time.days),
            "short_desc": post.short_desc,
            "help_desc": post.help_desc,
            "org_name": org.name,
            "org_private_name": org2.name,
        },
    )

    assert create_post_resp.status_code == 201

    assert create_post_resp.json["id_org_priv"] == org2_resp.json["id"]


# python -m pytest tests_back/integration/test_api.py::test_post
def test_post(front_client):
    org = create_org()
    org_resp = front_client.post(
        "test/org", json={"name": org.name, "contacts": org.contacts}
    )

    post = create_post(org_resp.json["id"])

    create_post_resp = front_client.post(
        "/test/post",
        json={
            "name": post.name,
            "date_start": str(post.date_start),
            "delta_time": int(post.delta_time.days),
            "short_desc": post.short_desc,
            "help_desc": post.help_desc,
            "org_name": org.name,
        },
    )

    post_resp = front_client.get("/test/post/{}".format(create_post_resp.json["id"]))

    assert post_resp.status_code == 200
    assert post_resp.json["id"] == create_post_resp.json["id"]
    assert post_resp.json["help_desc"] == post.help_desc

    wrong_id = 1000
    post_resp = front_client.get("/test/post/{}".format(wrong_id))
    assert post_resp.status_code == 403
    assert post_resp.json["ans"] == "there is no post with id {}".format(wrong_id)


# python -m pytest tests_back/integration/test_api.py::test_add_user
def test_add_user(front_client):
    orgs = create_org(3)
    for org in orgs:
        db.session.add(org)
    db.session.commit()

    user = create_users()
    db.session.add(user)
    db.session.commit()

    for org in orgs:
        add_user_resp = front_client.post(
            "/test/add-user",
            json={"user_login": user.login, "org_name": org.name, "status": "user"},
        )

        assert add_user_resp.status_code == 201
        assert add_user_resp.json["user"] == user.serialize()
        assert org.name in list(
            map(
                lambda position: position["org"],
                add_user_resp.json["user"]["positions"],
            )
        )

    add_user_resp = front_client.post(
        "/test/add-user",
        json={"user_login": user.login, "org_name": orgs[0].name, "status": "user"},
    )

    assert add_user_resp.json == "position already exist"
    assert add_user_resp.status_code == 400
