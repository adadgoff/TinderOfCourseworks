from uuid import UUID

from pydantic import ConfigDict, EmailStr, Field
from pydantic.alias_generators import to_camel
from pydantic.json_schema import SkipJsonSchema

from src.modules.supervisor.entities import SupervisorBase


class SupervisorBaseSchema(SupervisorBase):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )


class SupervisorCreate(SupervisorBaseSchema):
    id: UUID


class SupervisorRead(SupervisorBaseSchema):
    pass


class SupervisorUpdate(SupervisorBaseSchema):
    email: SkipJsonSchema[EmailStr] | None = Field(
        default=None,
        exclude=True,
    )
