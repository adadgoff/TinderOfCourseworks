from abc import ABC
from typing import (
    Any,
    Self,
)

from pydantic import (
    BaseModel,
    ConfigDict,
)

from domains.exceptions import DomainInstanceForbiddenException


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

    # TODO: extract and remove duplication '__new__' method.
    def __new__(
            cls,
            *args: tuple[Any],
            **kwds: dict[str, Any],
    ) -> Self:
        if cls is Domain:
            raise DomainInstanceForbiddenException
        return super().__new__(cls)
