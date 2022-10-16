import sqlalchemy


def sqlalchemy_decorator(funk):
    def _wrapper(*args, **kwargs):
        try:
            return funk(*args, **kwargs)
        except sqlalchemy.exc.IntegrityError:
            return {"error": "sql integrity error, check unique args"}, 500

    return _wrapper
