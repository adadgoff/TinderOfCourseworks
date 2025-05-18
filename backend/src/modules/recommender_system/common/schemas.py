# from uuid import UUID

# from sqlmodel import JSON, Field

# from backend.src.modules.common.coursework.consts import (
#     COURSEWORK_MAX_SKILLS_COUNT,
#     COURSEWORK_MIN_SKILLS_COUNT,
# )
# from src.modules.recommender_system.common.entities import CwBase


# class CwBaseSchema(CwBase):
#     pass


# class CwCreate(CwBaseSchema):
#     pass


# class CwUpdate(CwBaseSchema):
#     id: UUID
#     skills: list[str] = Field(
#         default_factory=list,
#         min_length=COURSEWORK_MIN_SKILLS_COUNT - COURSEWORK_MIN_SKILLS_COUNT,
#         max_length=COURSEWORK_MAX_SKILLS_COUNT,
#         sa_type=JSON,
#     )
