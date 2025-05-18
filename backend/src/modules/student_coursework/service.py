from uuid import UUID

from fastapi import HTTPException, status
from sqlmodel.ext.asyncio.session import AsyncSession

from src.modules.common.coursework.schemas import CourseworkCreate, CourseworkUpdate
from src.modules.student.entities import Student
from src.modules.student.service import student_service
from src.modules.student_coursework.entities import StudentCoursework
from src.modules.student_coursework.repository import student_coursework_repository
from src.modules.recommender_system.entities.st import StCw
from src.modules.recommender_system.services.st import st_cw_service


class StudentCourseworkService:
    async def create_coursework(
        self,
        coursework_create: CourseworkCreate,
        current_student: Student,
        session: AsyncSession,
    ) -> StudentCoursework:
        coursework = await student_coursework_repository.create_coursework(
            coursework_create=coursework_create,
            student_id=current_student.id,
            session=session,
        )

        await session.refresh(current_student)
        await st_cw_service.create_cw(
            cw_create=StCw(**coursework.model_dump()),
            session=session,
        )

        await session.refresh(coursework)
        return coursework

    async def read_coursework(
        self,
        coursework_id: UUID,
        session: AsyncSession,
    ) -> StudentCoursework:
        coursework = await student_coursework_repository.read_coursework(
            coursework_id=coursework_id,
            session=session,
        )

        if coursework is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Student Coursework not found",
            )

        return coursework

    async def read_courseworks(
        self,
        student_id: UUID,
        session: AsyncSession,
    ) -> list[StudentCoursework]:
        # Check student existence.
        await student_service.read_student(
            student_id=student_id,
            session=session,
        )

        courseworks = await student_coursework_repository.read_courseworks(
            student_id=student_id,
            session=session,
        )

        if len(courseworks) == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Student Courseworks not found",
            )

        return courseworks

    async def update_coursework(
        self,
        coursework_update: CourseworkUpdate,
        current_student: Student,
        session: AsyncSession,
    ) -> StudentCoursework:
        # Check coursework existence.
        coursework = await self.read_coursework(
            coursework_id=coursework_update.id,
            session=session,
        )

        if coursework.student_id != current_student.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Student not allowed to update this coursework",
            )

        coursework = await student_coursework_repository.update_coursework(
            coursework_update=coursework_update,
            session=session,
        )

        await st_cw_service.update_cw(
            cw_update=StCw(**coursework_update.model_dump()),
            session=session,
        )

        await session.refresh(coursework)
        return coursework


student_coursework_service = StudentCourseworkService()
