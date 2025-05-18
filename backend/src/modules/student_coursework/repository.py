from uuid import UUID

from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from src.modules.common.coursework.schemas import CourseworkCreate, CourseworkUpdate
from src.modules.student_coursework.entities import StudentCoursework


class StudentCourseworkRepository:
    async def create_coursework(
        self,
        coursework_create: CourseworkCreate,
        student_id: UUID,
        session: AsyncSession,
    ) -> StudentCoursework:
        coursework = StudentCoursework(
            student_id=student_id,
            **coursework_create.model_dump(),
        )
        session.add(coursework)
        await session.commit()
        await session.refresh(coursework)
        return coursework

    async def read_coursework(
        self,
        coursework_id: UUID,
        session: AsyncSession,
    ) -> StudentCoursework | None:
        coursework = await session.get(
            entity=StudentCoursework,
            ident=coursework_id,
        )
        return coursework

    async def read_courseworks(
        self,
        student_id: UUID,
        session: AsyncSession,
    ) -> list[StudentCoursework]:
        statement = select(StudentCoursework).where(
            StudentCoursework.student_id == student_id
        )
        courseworks = (await session.exec(statement)).all()
        return courseworks

    async def update_coursework(
        self,
        coursework_update: CourseworkUpdate,
        session: AsyncSession,
    ) -> StudentCoursework:
        coursework = await self.read_coursework(
            coursework_id=coursework_update.id,
            session=session,
        )

        update_data = coursework_update.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(coursework, field, value)

        session.add(coursework)
        await session.commit()
        await session.refresh(coursework)
        return coursework


student_coursework_repository = StudentCourseworkRepository()
