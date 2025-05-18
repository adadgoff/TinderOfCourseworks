from datetime import date, datetime, timezone
from uuid import UUID

from pydantic import ConfigDict, HttpUrl
from pydantic.alias_generators import to_camel
from sqlmodel import (
    Field,
    SQLModel,
    JSON,
)

from src.modules.common.coursework.entities import CourseworkStatus
from src.shared.sql.columns import HttpUrlType
from src.modules.common.coursework.consts import (
    COURSEWORK_ICON_URL_DEFAULT,
    COURSEWORK_MAX_DESCRIPTION_LENGTH,
    COURSEWORK_MAX_SKILLS_COUNT,
    COURSEWORK_MAX_TITLE_LENGTH,
    COURSEWORK_MIN_DESCRIPTION_LENGTH,
    COURSEWORK_MIN_SKILLS_COUNT,
    COURSEWORK_MIN_TITLE_LENGTH,
)


class CourseworkBase(SQLModel):
    title: str = Field(
        min_length=COURSEWORK_MIN_TITLE_LENGTH,
        max_length=COURSEWORK_MAX_TITLE_LENGTH,
    )
    icon_url: HttpUrl | None = Field(
        default=COURSEWORK_ICON_URL_DEFAULT,
        sa_type=HttpUrlType,
    )
    description: str = Field(
        min_length=COURSEWORK_MIN_DESCRIPTION_LENGTH,
        max_length=COURSEWORK_MAX_DESCRIPTION_LENGTH,
    )
    last_change: date | None = Field(
        default_factory=lambda: datetime.now(timezone.utc).date(),
    )
    status: CourseworkStatus = CourseworkStatus.Matching
    skills: list[str] = Field(
        min_length=COURSEWORK_MIN_SKILLS_COUNT,
        max_length=COURSEWORK_MAX_SKILLS_COUNT,
        sa_type=JSON,
    )


class CourseworkBaseSchema(CourseworkBase):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )


class CourseworkCreate(CourseworkBaseSchema):
    pass


class CourseworkRead(CourseworkBaseSchema):
    id: UUID


class CourseworkUpdate(CourseworkBaseSchema):
    id: UUID
