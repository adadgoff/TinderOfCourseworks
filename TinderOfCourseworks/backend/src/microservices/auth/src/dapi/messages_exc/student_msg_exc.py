class StudentResponseException(Exception):
    pass


class StudentResponseInstanceForbiddenException(
    StudentResponseException,
):
    pass
