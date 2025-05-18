from uuid import UUID

from sqlmodel.ext.asyncio.session import AsyncSession

from src.modules.student.entities import Student
from src.modules.student.schemas import StudentCreate, StudentUpdate


class StudentRepository:
    async def create_student(
        self,
        student_create: StudentCreate,
        session: AsyncSession,
    ) -> Student:
        student = Student(**student_create.model_dump())
        session.add(student)
        await session.commit()
        return student

    async def read_student(
        self,
        student_id: UUID,
        session: AsyncSession,
    ) -> Student | None:
        student = await session.get(
            entity=Student,
            ident=student_id,
        )
        return student

    async def update_student(
        self,
        student_id: UUID,
        student_update: StudentUpdate,
        session: AsyncSession,
    ) -> Student:
        student = await self.read_student(
            student_id=student_id,
            session=session,
        )

        update_data = student_update.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(student, field, value)

        session.add(student)
        await session.commit()
        await session.refresh(student)
        return student


student_repository = StudentRepository()
