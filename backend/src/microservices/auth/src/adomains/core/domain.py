from abc import ABC

from zcommon import ForbidInstance
from adomains.exceptions import DomainInstanceForbiddenException


@ForbidInstance(
    cls_exception=DomainInstanceForbiddenException,
)
class Domain(ABC):
    pass
