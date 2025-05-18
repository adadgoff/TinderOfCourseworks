from uuid import UUID, uuid4

from sqlmodel import (
    Field,
)

from src.modules.common.coursework.schemas import CourseworkBase


class StudentCoursework(CourseworkBase, table=True):
    id: UUID = Field(
        default_factory=uuid4,
        primary_key=True,
    )
    student_id: UUID = Field(
        index=True,
    )
