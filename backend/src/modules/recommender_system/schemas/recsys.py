from uuid import UUID

from pydantic import ConfigDict
from pydantic.alias_generators import to_camel
from sqlmodel import SQLModel


class RecBaseSchema(SQLModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )


class RecStRead(RecBaseSchema):
    st_id: UUID


class RecStCwRead(RecBaseSchema):
    st_cw_id: UUID


class RecSvRead(RecBaseSchema):
    sv_id: UUID


class RecSvCwRead(RecBaseSchema):
    sv_cw_id: UUID
