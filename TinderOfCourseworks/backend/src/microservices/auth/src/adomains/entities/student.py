from uuid import UUID

from adomains.core import (
    Domain,
    hasher as default_hasher,
    IHasher,
    Validator,
)


class Student(Domain):
    __slots__ = (
        "_email",
        "_hasher",
        "_password",
        "_uuid",
    )

    def __init__(
            self,
            /,
            *,
            uuid: UUID,
            email: str,
            password: str,
            hasher: IHasher = default_hasher,
    ) -> None:
        self.hasher = hasher
        self.uuid = uuid
        self.email = email
        self.password = password

    @property
    def uuid(self) -> UUID:
        return self._uuid

    @uuid.setter
    def uuid(
        self,
        value: UUID,
    ) -> None:
        if not isinstance(value, UUID):
            raise TypeError  # TODO: implement.
        if self._uuid:
            raise ValueError  # TODO: implement.
        self._uuid = value
    
    @property
    def email(self) -> str:
        return self._email

    @email.setter
    def email(
        self,
        value: str,
    ) -> None:
        self._email = Validator.get_validated_email(
            email=value,
        )

    @property
    def password(self) -> str:
        return self._password

    @password.setter
    def password(
        self,
        value: str,
    ) -> None:
        validated_password = Validator.get_validated_password(
            password=value,
        )
        if self._password and self.hasher.verify(
            plain_password=validated_password,
            hashed_password=self._password,
        ):
            raise ValueError("same passwords")  # TODO: implement.
        self._password = self.hasher.encode(
            password=validated_password,
        )

    @property
    def hasher(self) -> IHasher:
        return self._hasher

    @hasher.setter
    def hasher(
        self,
        hasher: IHasher,
    ) -> None:
        if not isinstance(hasher, IHasher):
            raise TypeError  # TODO: implement.
        self._hasher = hasher
