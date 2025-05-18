# from uuid import UUID

# from sqlmodel import JSON, Field

# from src.modules.supervisor.consts import (
#     SUPERVISOR_MAX_SKILLS_COUNT,
#     SUPERVISOR_MIN_SKILLS_COUNT,
# )
# from src.modules.recommender_system.entities.st import StBase


# class SvBaseSchema(StBase):
#     pass


# class SvCreate(SvBaseSchema):
#     id: UUID


# class SvUpdate(SvBaseSchema):
#     skills: list[str] = Field(
#         default_factory=list,
#         min_length=SUPERVISOR_MIN_SKILLS_COUNT - SUPERVISOR_MIN_SKILLS_COUNT,
#         max_length=SUPERVISOR_MAX_SKILLS_COUNT,
#         sa_type=JSON,
#     )
