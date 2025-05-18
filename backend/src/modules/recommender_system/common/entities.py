from sqlmodel import Field, SQLModel, JSON

from src.modules.common.coursework.consts import (
    COURSEWORK_MIN_SKILLS_COUNT,
    COURSEWORK_MAX_SKILLS_COUNT,
)


class CwBase(SQLModel):
    skills: list[str] = Field(
        default_factory=list,
        min_length=COURSEWORK_MIN_SKILLS_COUNT - COURSEWORK_MIN_SKILLS_COUNT,
        max_length=COURSEWORK_MAX_SKILLS_COUNT,
        sa_type=JSON,
    )
