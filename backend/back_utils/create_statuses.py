def create_statuses(db, Status):
    statuses = ["user", "moder"]

    for status_name in statuses:
        status = Status(status_name=status_name)
        db.session.add(status)

    db.session.commit()
