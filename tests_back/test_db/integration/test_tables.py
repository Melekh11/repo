from tables.models import User, Organization, Post, Review


def test_user_of_org(test_db):
    members = [[], []]
    orgs = Organization.query.all()
    assert orgs[0].id == 1
    assert orgs[1].id == 2
    assert len(User.query.all()) == 4

    mem = orgs[0].participants.all()
    for pos in mem:
        members[0].append(pos.user_id)

    mem = orgs[1].participants.all()

    for pos in mem:
        members[1].append(pos.user_id)

    for i in range(1, 2):
        assert sorted(members[i]) == test_db["users_of_orgs"][i + 1]


def test_review(test_db):
    revs = Review.query.get(1)
    assert revs.id_post == test_db["review"]

    post = Post.query.first()
    assert post.reviews[0]
    assert post.reviews[0].time_option == "ok"


def test_posts_of_org(test_db):
    posts = Post.query.all()
    posts_id = {}
    for post in posts:
        if post.org.id in posts_id.keys():
            posts_id[post.org.id].append(post.id)
        else:
            posts_id[post.org.id] = [post.id]
    for key in posts_id.keys():
        posts_id[key].sort()
    assert posts_id == test_db["posts_of_org"]


def test_private_post(test_db):
    post = Post.query.filter(Post.id_org_private == 2).first()
    assert post.org_private().id == 2


def test_wrong():
    assert 1 == 2
