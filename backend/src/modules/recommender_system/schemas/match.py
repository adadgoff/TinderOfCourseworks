from uuid import UUID

from pydantic import ConfigDict
from pydantic.alias_generators import to_camel

from src.modules.recommender_system.entities.match import MatchBase


class MatchBaseSchema(MatchBase):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )


class MatchSt2SvCwCreate(MatchBaseSchema):
    sv_cw_id: UUID


class MatchStCw2SvCreate(MatchBaseSchema):
    st_cw_id: UUID
    sv_id: UUID


class MatchSv2StCwCreate(MatchBaseSchema):
    st_cw_id: UUID


class MatchSvCw2StCreate(MatchBaseSchema):
    sv_cw_id: UUID
    st_id: UUID


class MatchSt2SvCwRead(MatchBaseSchema):
    st_id: UUID
    sv_cw_id: UUID


class MatchStCw2SvRead(MatchBaseSchema):
    st_cw_id: UUID
    sv_id: UUID


class MatchSv2StCwRead(MatchBaseSchema):
    sv_id: UUID
    st_cw_id: UUID


class MatchSvCw2StRead(MatchBaseSchema):
    sv_cw_id: UUID
    st_id: UUID


# TODO: implement.

# class MatchSt2SvCwUpdate(MatchBaseSchema):
#     st_id: UUID
#     sv_cw_id: UUID


# class MatchStCw2SvUpdate(MatchBaseSchema):
#     st_cw_id: UUID
#     sv_id: UUID


# class MatchSv2StCwUpdate(MatchBaseSchema):
#     sv_id: UUID
#     st_cw_id: UUID


# class MatchSvCw2StUpdate(MatchBaseSchema):
#     sv_cw_id: UUID
#     st_id: UUID
