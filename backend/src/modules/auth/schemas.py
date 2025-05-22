from uuid import UUID
from pydantic import Field
from pydantic.json_schema import SkipJsonSchema

from src.modules.auth.entities import UserBase
from src.modules.auth.security import Token


class UserLogin(UserBase):
    pass


class UserRegister(UserBase):
    pass


class UserLoginRead(Token):
    pass


class UserRegisterRead(UserBase):
    password: SkipJsonSchema[str] = Field(exclude=True)
