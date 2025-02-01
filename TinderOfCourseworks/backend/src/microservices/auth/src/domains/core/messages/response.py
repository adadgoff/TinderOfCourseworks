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
    BaseModel,
    model_validator,
)

from domains.core.messages import Message
from domains.exceptions import (
    ResponseBodyInstanceForbiddenException,
    ResponseInstanceForbiddenException,
    ResponseStatusBodyIncompatibleException,
)


@unique
class Status(Enum):
    OK = 0
    FAIL = 1


class ResponseBody(
    ABC,
    BaseModel,
):
    # TODO: extract and remove duplication '__new__' method.
    def __new__(
            cls,
            *args: tuple[Any],
            **kwds: dict[str, Any],
    ) -> Self:
        if cls is Response:            
            raise ResponseBodyInstanceForbiddenException
        return super().__new__(cls)


class Response(Message):
    status: Status
    body: None | ResponseBody

    # TODO: extract and remove duplication '__new__' method.
    def __new__(
            cls,
            *args: tuple[Any],
            **kwds: dict[str, Any],
    ) -> Self:
        if cls is Response:            
            raise ResponseInstanceForbiddenException
        return super().__new__(cls)

    @model_validator(mode="after")
    def check_status_body_compatible(self) -> Self:
        if (self.status == Status.OK
                and
                self.body is not None):
            raise ResponseStatusBodyIncompatibleException
        
        if (self.status == Status.FAIL
                and
                self.body is None):
            raise ResponseStatusBodyIncompatibleException

        return self
