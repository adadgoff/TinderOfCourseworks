from abc import (
    ABC,
    abstractmethod,
)

from passlib.context import CryptContext


password_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
)


class IHasher(ABC):
    @abstractmethod
    def encode(
            self,
            /,
            *,
            password: str,
    ) -> str:
        pass

    @abstractmethod
    def verify(
            self,
            /,
            *,
            plain_password: str,
            hashed_password: str,
    ) -> bool:
        pass


class Hasher(IHasher):
    def encode(
            self,
            /,
            *,
            password: str,
    ) -> str:
        if not isinstance(password, str):
            raise TypeError  # TODO: implement exception.
        return password_context.hash(secret=password)

    def verify(
            self,
            /,
            *,
            plain_password: str,
            hashed_password: str,
    ) -> bool:
        if not isinstance(plain_password, str):
            raise TypeError  # TODO: implement exception.
        if not isinstance(hashed_password, str):
            raise TypeError  # TODO: implement exception.
        return password_context.verify(
            secret=plain_password,
            hash=hashed_password,
        )


hasher = Hasher()
