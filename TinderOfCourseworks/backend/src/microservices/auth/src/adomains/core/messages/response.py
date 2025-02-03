from abc import ABC
from enum import (
    Enum,
    unique,
)
from typing import (
    Any,
    Self,
)

from pydantic import (
    Field,
    model_validator,
)

from adomains.core import ForbidInstance
from adomains.core.messages import Message
from adomains.exceptions import (
    ResponseInstanceForbiddenException,
    ResponseStatusMessageIncompatibleException,
)


@unique
class Status(Enum):
    OK = 0
    FAIL = 1


@ForbidInstance(
    cls_exception=ResponseInstanceForbiddenException,
)
class Response(Message):
    status: Status
    message: str = Field(
        default="",
    )

    @model_validator(mode="after")
    def check_status_body_compatible(self) -> Self:
        # ------------------------------------------------------------
        # | Status / Message |   Empty message   | Not empty message |
        # ------------------------------------------------------------
        # |  Status = OK     | [V]   Valid case  | [X] Invalid case  |
        # |  Status = FAIL   | [X] Invalid case  | [V]   Valid case  |
        # ------------------------------------------------------------

        if (self.status == Status.OK
                and
                len(self.message) > 0):
            raise ResponseStatusMessageIncompatibleException

        if (self.status == Status.FAIL
                and
                len(self.message) == 0):
            raise ResponseStatusMessageIncompatibleException

        return self
