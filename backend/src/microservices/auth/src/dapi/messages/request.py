from adomains.core import ForbidInstance
from adomains.core.messages import Message
from adomains.exceptions import (
    RequestInstanceForbiddenException,
)


@ForbidInstance(
    cls_exception=RequestInstanceForbiddenException,
)
class Request(Message):
    pass
