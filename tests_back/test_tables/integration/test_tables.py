from tables.models import User, Organization, Post, Review


def test_user_of_org(test_db):
    members = [[], []]
    orgs = Organization.query.all()

    mem = orgs[0].participants.all()
    for pos in mem:
        members[0].append(pos.user_id)

    mem = orgs[1].participants.all()
    for pos in mem:
        members[1].append(pos.user_id)

    data = test_db["data"]

    for i in range(2):
        assert sorted(members[i]) == data["users_of_orgs"][i+1]


def test_review(test_db):
    revs = Review.query.get(1)
    assert revs.id_post == test_db["data"]["review"]
