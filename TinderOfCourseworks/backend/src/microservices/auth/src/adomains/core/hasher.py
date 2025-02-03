from abc import (
    ABC,
    abstractmethod,
)

from passlib.context import CryptContext
from pydantic import (
    BaseModel,
    ConfigDict,
)


password_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
)


# TODO: separate in files.
class IHasher(
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

    @abstractmethod
    def encode(
            self,
            password: str,
    ) -> str:
        pass

    @abstractmethod
    def verify(
        self,
        plain_password: str,
        hashed_password: str,
    ) -> bool:
        pass


class Hasher(IHasher):
    def encode(
            self,
            password: str,
    ) -> str:
        return password_context.hash(secret=password)

    def verify(
            self,
            plain_password: str,
            hashed_password: str,
    ) -> bool:
        return password_context.verify(
            secret=plain_password,
            hash=hashed_password,
        )


hasher = Hasher()
