from tables.models import User


def check_unique_login(login):
    return len(User.query.filter(User.login == login).all()) == 0


def check_unique_email(email):
    return len(User.query.filter(User.email == email).all()) == 0


def check_unique_user(login, email):
    return check_unique_email(email) and check_unique_login(login)


def get_user_by_id(id):
    return User.query.filter(User.id == id).first()


def get_user_by_login(login):
    return User.query.filter(User.login == login).first()
