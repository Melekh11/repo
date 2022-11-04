import sqlalchemy


# декоратор, защищающий от неправильных вставок через sqlalchemy
# и выкидывающий 500 ошибку
def sqlalchemy_decorator(funk):
    def _wrapper(*args, **kwargs):
        try:
            return funk(*args, **kwargs)
        except sqlalchemy.exc.IntegrityError:
            return "sql integrity error, check unique args", 500

    return _wrapper
