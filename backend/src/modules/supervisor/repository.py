from uuid import UUID

from sqlmodel.ext.asyncio.session import AsyncSession

from src.modules.supervisor.entities import Supervisor
from src.modules.supervisor.schemas import SupervisorCreate, SupervisorUpdate


class SupervisorRepository:
    async def create_supervisor(
        self,
        supervisor_create: SupervisorCreate,
        session: AsyncSession,
    ) -> Supervisor:
        supervisor = Supervisor(**supervisor_create.model_dump())
        session.add(supervisor)
        await session.commit()
        return supervisor

    async def read_supervisor(
        self,
        supervisor_id: UUID,
        session: AsyncSession,
    ) -> Supervisor | None:
        supervisor = await session.get(
            entity=Supervisor,
            ident=supervisor_id,
        )
        return supervisor

    async def update_supervisor(
        self,
        supervisor_id: UUID,
        supervisor_update: SupervisorUpdate,
        session: AsyncSession,
    ) -> Supervisor:
        supervisor = await self.read_supervisor(
            supervisor_id=supervisor_id,
            session=session,
        )

        update_data = supervisor_update.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(supervisor, field, value)

        session.add(supervisor)
        await session.commit()
        await session.refresh(supervisor)
        return supervisor


supervisor_repository = SupervisorRepository()
