from tables.__all_models import User, Organization

# человекочитаемые helper'ы


def check_unique_login(login):
    return len(User.query.filter(User.login == login).all()) == 0


def check_user_by_login(login):
    return len(User.query.filter(User.login == login).all()) == 1


def check_unique_email(email):
    return len(User.query.filter(User.email == email).all()) == 0


def check_unique_user(login, email):
    return check_unique_email(email) and check_unique_login(login)


def check_org_by_name(name):
    return len(Organization.query.filter(Organization.name == name).all()) == 1


def get_user_by_id(id):
    return User.query.filter(User.id == id).first()


def get_user_by_login(login):
    return User.query.filter(User.login == login).first()


def get_org_by_name(name):
    return Organization.query.filter(Organization.name == name).first()


def check_unique_org(name):
    return len(Organization.query.filter(Organization.name == name).all()) == 0
