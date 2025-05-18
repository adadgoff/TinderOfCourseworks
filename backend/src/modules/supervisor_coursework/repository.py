from uuid import UUID

from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from src.modules.common.coursework.schemas import CourseworkCreate, CourseworkUpdate
from src.modules.supervisor_coursework.entities import SupervisorCoursework


class SupervisorCourseworkRepository:
    async def create_coursework(
        self,
        coursework_create: CourseworkCreate,
        supervisor_id: UUID,
        session: AsyncSession,
    ) -> SupervisorCoursework:
        coursework = SupervisorCoursework(
            supervisor_id=supervisor_id,
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
    ) -> SupervisorCoursework | None:
        coursework = await session.get(
            entity=SupervisorCoursework,
            ident=coursework_id,
        )
        return coursework

    async def read_courseworks(
        self,
        supervisor_id: UUID,
        session: AsyncSession,
    ) -> list[SupervisorCoursework]:
        statement = select(SupervisorCoursework).where(
            SupervisorCoursework.supervisor_id == supervisor_id
        )
        courseworks = (await session.exec(statement)).all()
        return courseworks

    async def update_coursework(
        self,
        coursework_update: CourseworkUpdate,
        session: AsyncSession,
    ) -> SupervisorCoursework:
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


supervisor_coursework_repository = SupervisorCourseworkRepository()
