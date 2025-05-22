from uuid import UUID

from fastapi import HTTPException, status
from sqlmodel.ext.asyncio.session import AsyncSession

from src.modules.student.entities import Student
from src.modules.student.repository import student_repository
from src.modules.student.schemas import StudentCreate, StudentUpdate
from src.modules.recommender_system.entities.st import St
from src.modules.recommender_system.services.st import st_service


class StudentService:
    async def create_student(
        self,
        student_create: StudentCreate,
        session: AsyncSession,
    ) -> Student:
        student = await student_repository.create_student(
            student_create=student_create,
            session=session,
        )
        return student

    async def read_student(
        self,
        student_id: UUID,
        session: AsyncSession,
    ) -> Student:
        student = await student_repository.read_student(
            student_id=student_id,
            session=session,
        )

        if student is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Student not found",
            )

        return student

    async def update_student(
        self,
        student_update: StudentUpdate,
        current_student: Student,
        session: AsyncSession,
    ) -> Student:
        student = await student_repository.update_student(
            student_id=current_student.id,
            student_update=student_update,
            session=session,
        )

        await st_service.update_st(
            st_update=St(**student.model_dump()),
            session=session,
        )

        await session.refresh(student)
        return student


student_service = StudentService()
