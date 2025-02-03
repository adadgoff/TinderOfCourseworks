from abc import ABC

from pydantic import (
    BaseModel,
    ConfigDict,
)

from adomains.core import ForbidInstance
from adomains.exceptions import (
    MessageInstanceForbiddenException,
)


@ForbidInstance(
    cls_exception=MessageInstanceForbiddenException,
)
class Message(
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
