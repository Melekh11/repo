import sqlalchemy


def sqlalchemy_decorator(funk):
    """
    декоратор, защищающий от неправильных вставок через sqlalchemy и выкидывающий 500 ошибку
    :param funk: функция для выполнения
    :return: func() или "sql integrity error, check unique args", 500
    """

    def _wrapper(*args, **kwargs):
        try:
            return funk(*args, **kwargs)
        except sqlalchemy.exc.IntegrityError:
            return "sql integrity error, check unique args", 500

    return _wrapper
