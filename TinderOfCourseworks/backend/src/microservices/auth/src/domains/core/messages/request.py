from typing import (
    Any,
    Self,
)

from domains.core.messages import Message
from domains.exceptions import (
    RequestInstanceForbiddenException,
)


class Request(Message):
    def __new__(
            cls,
            *args: tuple[Any],
            **kwds: dict[str, Any],
    ) -> Self:
        if cls is Request:            
            raise RequestInstanceForbiddenException
        return super().__new__(cls)
