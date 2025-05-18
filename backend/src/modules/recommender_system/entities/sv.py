from uuid import UUID

from sqlmodel import JSON, Field, SQLModel

from src.modules.recommender_system.common.entities import CwBase
from src.modules.supervisor.consts import (
    SUPERVISOR_MAX_SKILLS_COUNT,
    SUPERVISOR_MIN_SKILLS_COUNT,
)


class SvBase(SQLModel):
    skills: list[str] = Field(
        default_factory=list,
        min_length=SUPERVISOR_MIN_SKILLS_COUNT - SUPERVISOR_MIN_SKILLS_COUNT,
        max_length=SUPERVISOR_MAX_SKILLS_COUNT,
        sa_type=JSON,
    )


class Sv(SvBase, table=True):
    id: UUID = Field(primary_key=True)


class SvCw(CwBase, table=True):
    id: UUID = Field(primary_key=True)
    supervisor_id: UUID = Field(index=True)
