from adomains.exceptions.messages_exc import MessageException


class RequestException(MessageException):
    pass


class RequestInstanceForbiddenException(RequestException):
    pass
