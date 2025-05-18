from datetime import date, datetime, timezone
from uuid import UUID

from pydantic import (
    EmailStr,
    HttpUrl,
)
from sqlmodel import (
    DateTime,
    Field,
    SQLModel,
    JSON,
)

from src.shared.sql.columns import HttpUrlType
from src.modules.common.user.consts import (
    USER_MAX_EMAIL_LENGTH,
    USER_MAX_NAME_LENGTH,
    USER_MAX_PATRONYMIC_LENGTH,
    USER_MAX_SURNAME_LENGTH,
    USER_MIN_EMAIL_LENGTH,
    USER_MIN_NAME_LENGTH,
    USER_MIN_PATRONYMIC_LENGTH,
    USER_MIN_SURNAME_LENGTH,
)
from src.modules.student.consts import (
    STUDENT_ICON_URL_DEFAULT,
    STUDENT_MAX_BIRTHDAY_DATE,
    STUDENT_MAX_CITY_LENGTH,
    STUDENT_MAX_CONTACT_LENGTH,
    STUDENT_MAX_DESCRIPTION_LENGTH,
    STUDENT_MIN_BIRTHDAY_DATE,
    STUDENT_MIN_CITY_LENGTH,
    STUDENT_MIN_CONTACT_LENGTH,
    STUDENT_MIN_DESCRIPTION_LENGTH,
    STUDENT_MAX_SKILLS_COUNT,
    STUDENT_MIN_SKILLS_COUNT,
)


class StudentBase(SQLModel):
    email: EmailStr | None = Field(
        default=None,
        min_length=USER_MIN_EMAIL_LENGTH,
        max_length=USER_MAX_EMAIL_LENGTH,
        unique=True,
    )
    surname: str | None = Field(
        default=None,
        min_length=USER_MIN_SURNAME_LENGTH,
        max_length=USER_MAX_SURNAME_LENGTH,
        nullable=True,
    )
    name: str | None = Field(
        default=None,
        min_length=USER_MIN_NAME_LENGTH,
        max_length=USER_MAX_NAME_LENGTH,
        nullable=True,
    )
    patronymic: str | None = Field(
        default=None,
        min_length=USER_MIN_PATRONYMIC_LENGTH,
        max_length=USER_MAX_PATRONYMIC_LENGTH,
        nullable=True,
    )
    icon_url: HttpUrl | None = Field(
        default=STUDENT_ICON_URL_DEFAULT,
        sa_type=HttpUrlType,
        # nullable=True,
    )
    birthday: date | None = Field(
        default=None,
        ge=STUDENT_MIN_BIRTHDAY_DATE,
        le=STUDENT_MAX_BIRTHDAY_DATE,
        nullable=True,
    )
    city: str | None = Field(
        default=None,
        min_length=STUDENT_MIN_CITY_LENGTH,
        max_length=STUDENT_MAX_CITY_LENGTH,
        nullable=True,
    )
    contact: str | None = Field(
        default=None,
        min_length=STUDENT_MIN_CONTACT_LENGTH,
        max_length=STUDENT_MAX_CONTACT_LENGTH,
        nullable=True,
    )
    description: str | None = Field(
        default=None,
        min_length=STUDENT_MIN_DESCRIPTION_LENGTH,
        max_length=STUDENT_MAX_DESCRIPTION_LENGTH,
        nullable=True,
    )
    last_online: datetime | None = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_type=DateTime(timezone=True),
        # nullable=True,
    )
    skills: list[str] | None = Field(
        default_factory=list,
        min_length=STUDENT_MIN_SKILLS_COUNT - STUDENT_MIN_SKILLS_COUNT,
        max_length=STUDENT_MAX_SKILLS_COUNT,
        # nullable=True,
        sa_type=JSON,
    )


class Student(StudentBase, table=True):
    id: UUID = Field(
        primary_key=True,
    )
