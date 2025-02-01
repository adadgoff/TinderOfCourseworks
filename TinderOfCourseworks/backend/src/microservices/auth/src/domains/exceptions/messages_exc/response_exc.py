from domains.exceptions.messages_exc import MessageException


class ResponseException(MessageException):
    pass


class ResponseBodyInstanceForbiddenException(ResponseException):
    pass


class ResponseInstanceForbiddenException(ResponseException):
    pass


class ResponseStatusBodyIncompatibleException(ResponseException):
    pass
