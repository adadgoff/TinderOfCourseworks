from uuid import UUID, uuid4
from pydantic import EmailStr
from sqlmodel import Field, SQLModel

from src.modules.common.user.consts import (
    USER_HASHED_PASSWORD_LENGTH,
    USER_MAX_EMAIL_LENGTH,
    USER_MAX_PASSWORD_LENGTH,
    USER_MIN_EMAIL_LENGTH,
    USER_MIN_PASSWORD_LENGTH,
)


class UserBase(SQLModel):
    email: EmailStr = Field(
        min_length=USER_MIN_EMAIL_LENGTH,
        max_length=USER_MAX_EMAIL_LENGTH,
        unique=True,
    )
    password: str = Field(
        min_length=USER_MIN_PASSWORD_LENGTH,
        max_length=USER_MAX_PASSWORD_LENGTH,
    )


class AuthStudent(UserBase, table=True):
    id: UUID = Field(
        default_factory=uuid4,
        primary_key=True,
    )
    password: str = Field(
        min_length=USER_HASHED_PASSWORD_LENGTH,
        max_length=USER_HASHED_PASSWORD_LENGTH,
    )


class AuthSupervisor(UserBase, table=True):
    id: UUID = Field(
        default_factory=uuid4,
        primary_key=True,
    )
    password: str = Field(
        min_length=USER_HASHED_PASSWORD_LENGTH,
        max_length=USER_HASHED_PASSWORD_LENGTH,
    )
