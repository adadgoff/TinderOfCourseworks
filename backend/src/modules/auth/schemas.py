from pydantic import Field
from pydantic.json_schema import SkipJsonSchema

from src.modules.auth.entities import UserBase


class UserLogin(UserBase):
    pass


class UserRegister(UserBase):
    pass


class UserRead(UserBase):
    password: SkipJsonSchema[str] = Field(exclude=True)
