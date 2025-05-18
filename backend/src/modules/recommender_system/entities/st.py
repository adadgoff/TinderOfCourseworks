from uuid import UUID

from sqlmodel import JSON, Field, SQLModel

from src.modules.recommender_system.common.entities import CwBase
from src.modules.student.consts import (
    STUDENT_MAX_SKILLS_COUNT,
    STUDENT_MIN_SKILLS_COUNT,
)


class StBase(SQLModel):
    skills: list[str] = Field(
        default_factory=list,
        min_length=STUDENT_MIN_SKILLS_COUNT - STUDENT_MIN_SKILLS_COUNT,
        max_length=STUDENT_MAX_SKILLS_COUNT,
        sa_type=JSON,
    )


class St(StBase, table=True):
    id: UUID = Field(primary_key=True)


class StCw(CwBase, table=True):
    id: UUID = Field(primary_key=True)
    student_id: UUID = Field(index=True)
