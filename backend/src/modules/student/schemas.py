from uuid import UUID

from pydantic import ConfigDict, EmailStr, Field
from pydantic.alias_generators import to_camel
from pydantic.json_schema import SkipJsonSchema

from src.modules.student.entities import StudentBase


class StudentBaseSchema(StudentBase):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )


class StudentCreate(StudentBaseSchema):
    id: UUID


class StudentRead(StudentBaseSchema):
    pass


class StudentUpdate(StudentBaseSchema):
    email: SkipJsonSchema[EmailStr] | None = Field(
        default=None,
        exclude=True,
    )
