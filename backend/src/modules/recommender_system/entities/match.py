from datetime import datetime, timezone
from uuid import UUID

from sqlmodel import SQLModel, DateTime, Field
from enum import Enum


class MatchType(str, Enum):
    Like = "like"
    Skip = "skip"


class MatchBase(SQLModel):
    type: MatchType
    matched_at: datetime | None = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_type=DateTime(timezone=True),
    )


class MatchSt2SvCw(MatchBase, table=True):
    st_id: UUID = Field(primary_key=True)
    sv_cw_id: UUID = Field(primary_key=True)


class MatchStCw2Sv(MatchBase, table=True):
    st_cw_id: UUID = Field(primary_key=True)
    sv_id: UUID = Field(primary_key=True)


class MatchSv2StCw(MatchBase, table=True):
    sv_id: UUID = Field(primary_key=True)
    st_cw_id: UUID = Field(primary_key=True)


class MatchSvCw2St(MatchBase, table=True):
    sv_cw_id: UUID = Field(primary_key=True)
    st_id: UUID = Field(primary_key=True)
