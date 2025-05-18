from uuid import UUID
from pydantic import ConfigDict
from pydantic.alias_generators import to_camel

from src.modules.recommender_system.entities.approve import ApproveBase


class ApproveBaseSchema(ApproveBase):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )


class ApproveSt2SvCwRead(ApproveBaseSchema):
    st_id: UUID
    sv_cw_id: UUID


class ApproveSv2StCwRead(ApproveBaseSchema):
    sv_id: UUID
    st_cw_id: UUID


ApproveRead = ApproveSt2SvCwRead | ApproveSv2StCwRead
