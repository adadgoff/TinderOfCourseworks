from abc import ABC
from typing import (
    Any,
    Self,
)

from pydantic import (
    BaseModel,
    ConfigDict,
)

from domains.exceptions import (
    MessageInstanceForbiddenException,
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

    def __new__(
            cls,
            *args: tuple[Any],
            **kwds: dict[str, Any],
    ) -> Self:
        if cls is Message:            
            raise MessageInstanceForbiddenException
        return super().__new__(cls)
