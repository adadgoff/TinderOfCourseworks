from uuid import UUID

from sqlmodel import (
    Field,
    SQLModel,
)

from adomains import Student


class StudentOrm(
    Student,
    SQLModel,
    table=True,
):
    uuid: UUID = Field(
        primary_key=True,
    )
