from typing import Any
from uuid import UUID

from pydantic import (
    EmailStr,
    Field,
)

from adomains.core import (
    Domain,
    Hasher,
    hasher,
)


class Student(Domain):
    uuid: UUID
    email: EmailStr
    password: str = Field(
        repr=False,
    )
    password: str = Field(
        repr=False,
    )
    hasher: Hasher = Field(
        default=hasher,
        exclude=True,
        repr=False,
    )

    def model_post_init(
        self,
        __context: Any,
    ) -> None:
        object.__setattr__(
            self,
            "password",
            self.hasher.encode(
                password=self.password,
            ),
        )
