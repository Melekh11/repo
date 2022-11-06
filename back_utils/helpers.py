from tables.__all_models import User, Organisation

# человекочитаемые helper'ы


def check_unique_login(login):
    """
    проверка отсутсвия пользователей с данным логином
    :param login: логин для проверки
    :return: boolean
    """
    return len(User.query.filter(User.login == login).all()) == 0


def check_user_by_login(login):
    """
    проверка сущесвования пользователей с данным логином
    :param login: логин для проверки
    :return: boolean
    """
    return len(User.query.filter(User.login == login).all()) == 1


def check_unique_email(email):
    """
    проверка уникальности почты
    :param email: почта для проверки
    :return: boolean
    """
    return len(User.query.filter(User.email == email).all()) == 0


def check_org_by_name(name):
    """
    проверка наличия рганизации
    :param name: имя организации для проверки
    :return: boolean
    """
    return len(Organisation.query.filter(Organisation.name == name).all()) == 1


def get_user_by_id(id):
    """
    получения пользователя по id
    :param id: id искомного пользователя
    :return: User
    """
    return User.query.filter(User.id == id).first()


def get_user_by_login(login):
    """
    получение пользователя по логину
    :param login: логин искомого пользователя
    :return: User
    """
    return User.query.filter(User.login == login).first()


def get_org_by_name(name):
    """
    получение организации по её названию
    :param name: имя искомой организации
    :return: Organization
    """
    return Organisation.query.filter(Organisation.name == name).first()


def check_unique_org(name):
    """
    проверка уникальности имени организации
    :param name: имя для поиска
    :return: boolean
    """
    return len(Organisation.query.filter(Organisation.name == name).all()) == 0


def check_unique_user(login, email):
    """
    проверка уникальности данных для создания пользователя
    :param login: логин для сравнение
    :param email: почта для сравнения
    :return: boolean
    """
    return check_unique_login(login) and check_unique_email(email)
