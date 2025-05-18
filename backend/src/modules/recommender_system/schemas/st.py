# from uuid import UUID

# from sqlmodel import JSON, Field

# from src.modules.common.coursework.consts import (
#     COURSEWORK_MAX_SKILLS_COUNT,
#     COURSEWORK_MIN_SKILLS_COUNT,
# )
# from src.modules.recommender_system.common.schemas import CwBaseSchema
# from src.modules.student.consts import (
#     STUDENT_MAX_SKILLS_COUNT,
#     STUDENT_MIN_SKILLS_COUNT,
# )
# from src.modules.recommender_system.entities.st import StBase


# class StBaseSchema(StBase):
#     pass


# class StCreate(StBaseSchema):
#     id: UUID


# class StUpdate(StBaseSchema):
#     skills: list[str] = Field(
#         default_factory=list,
#         min_length=STUDENT_MIN_SKILLS_COUNT - STUDENT_MIN_SKILLS_COUNT,
#         max_length=STUDENT_MAX_SKILLS_COUNT,
#         sa_type=JSON,
#     )


# class StCwCreate(CwBaseSchema):
#     student_id: UUID


# class StCwUpdate(CwBaseSchema):
#     id: UUID
#     skills: list[str] = Field(
#         default_factory=list,
#         min_length=COURSEWORK_MIN_SKILLS_COUNT - COURSEWORK_MIN_SKILLS_COUNT,
#         max_length=COURSEWORK_MAX_SKILLS_COUNT,
#         sa_type=JSON,
#     )
#     student_id: UUID
