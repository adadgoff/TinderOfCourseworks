from abc import ABC

from pydantic import (
    BaseModel,
    ConfigDict,
)

from zcommon import ForbidInstance
from adomains.exceptions import DomainInstanceForbiddenException


@ForbidInstance(
    cls_exception=DomainInstanceForbiddenException,
)
class Domain(
    ABC,
    BaseModel,
):
    model_config = ConfigDict(
        extra="forbid",
        frozen=True,
        strict=True,
        validate_default=True,
        validate_return=True,
    )
