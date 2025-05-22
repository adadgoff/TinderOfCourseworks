from uuid import UUID

from fastapi import HTTPException, status
from sqlmodel.ext.asyncio.session import AsyncSession

from src.modules.supervisor.entities import Supervisor
from src.modules.supervisor.repository import supervisor_repository
from src.modules.supervisor.schemas import SupervisorCreate, SupervisorUpdate
from src.modules.recommender_system.entities.sv import Sv
from src.modules.recommender_system.services.sv import sv_service


class SupervisorService:
    async def create_supervisor(
        self,
        supervisor_create: SupervisorCreate,
        session: AsyncSession,
    ) -> Supervisor:
        supervisor = await supervisor_repository.create_supervisor(
            supervisor_create=supervisor_create,
            session=session,
        )
        return supervisor

    async def read_supervisor(
        self,
        supervisor_id: UUID,
        session: AsyncSession,
    ) -> Supervisor:
        supervisor = await supervisor_repository.read_supervisor(
            supervisor_id=supervisor_id,
            session=session,
        )

        if supervisor is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Supervisor not found",
            )

        return supervisor

    async def update_supervisor(
        self,
        supervisor_update: SupervisorUpdate,
        current_supervisor: Supervisor,
        session: AsyncSession,
    ) -> Supervisor:
        supervisor = await supervisor_repository.update_supervisor(
            supervisor_id=current_supervisor.id,
            supervisor_update=supervisor_update,
            session=session,
        )

        await sv_service.update_sv(
            sv_update=Sv(**supervisor.model_dump()),
            session=session,
        )

        await session.refresh(supervisor)
        return supervisor


supervisor_service = SupervisorService()
