class SupervisorResponseException(Exception):
    pass


class SupervisorResponseInstanceForbiddenException(
    SupervisorResponseException,
):
    pass
