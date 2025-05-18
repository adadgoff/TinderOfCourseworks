from uuid import UUID
from datetime import datetime, timezone

from sqlmodel import DateTime, Field, SQLModel


class ApproveBase(SQLModel):
    pass


class ApproveSt2SvCw(ApproveBase, table=True):
    st_id: UUID = Field(primary_key=True)
    sv_cw_id: UUID = Field(primary_key=True)
    approved_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_type=DateTime(timezone=True),
    )


class ApproveSv2StCw(ApproveBase, table=True):
    sv_id: UUID = Field(primary_key=True)
    st_cw_id: UUID = Field(primary_key=True)
    approved_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_type=DateTime(timezone=True),
    )


Approve = ApproveSt2SvCw | ApproveSv2StCw
