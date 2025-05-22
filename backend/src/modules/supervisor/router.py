from uuid import UUID

from fastapi import APIRouter, Depends
from fastapi_utils.cbv import cbv
from sqlmodel.ext.asyncio.session import AsyncSession

from src.core.deps import get_db
from src.modules.supervisor.entities import Supervisor
from src.modules.supervisor.deps import get_current_supervisor
from src.modules.supervisor.schemas import SupervisorRead, SupervisorUpdate
from src.modules.supervisor.service import supervisor_service


router = APIRouter(prefix="/supervisor", tags=["Supervisor"])


@cbv(router)
class SupervisorRouter:
    session: AsyncSession = Depends(get_db)

    @router.get(path="/personal")
    async def get_supervisor_personal(
        self,
        current_supervisor: Supervisor = Depends(get_current_supervisor),
    ) -> SupervisorRead:
        supervisor = await supervisor_service.read_supervisor(
            supervisor_id=current_supervisor.id,
            session=self.session,
        )
        return supervisor

    @router.get(path="/{supervisor_id}")
    async def get_supervisor(
        self,
        supervisor_id: UUID,
    ) -> SupervisorRead:
        supervisor = await supervisor_service.read_supervisor(
            supervisor_id=supervisor_id,
            session=self.session,
        )
        return supervisor

    @router.patch(path="/edit")
    async def edit_supervisor(
        self,
        supervisor_update: SupervisorUpdate,
        current_supervisor: Supervisor = Depends(get_current_supervisor),
    ) -> SupervisorRead:
        supervisor = await supervisor_service.update_supervisor(
            supervisor_update=supervisor_update,
            current_supervisor=current_supervisor,
            session=self.session,
        )
        return supervisor
