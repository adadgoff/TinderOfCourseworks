from uuid import UUID
from sqlmodel import SQLModel


class RecBaseSchema(SQLModel):
    pass


class RecStRead(RecBaseSchema):
    st_id: UUID


class RecStCwRead(RecBaseSchema):
    st_cw_id: UUID


class RecSvRead(RecBaseSchema):
    sv_id: UUID


class RecSvCwRead(RecBaseSchema):
    sv_cw_id: UUID
