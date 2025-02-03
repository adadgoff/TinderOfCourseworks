from adomains.exceptions.messages_exc import MessageException


class ResponseException(MessageException):
    pass


class ResponseInstanceForbiddenException(ResponseException):
    pass


class ResponseStatusMessageIncompatibleException(ResponseException):
    pass
