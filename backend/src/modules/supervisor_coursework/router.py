from uuid import UUID

from fastapi import APIRouter, Depends
from fastapi_utils.cbv import cbv
from sqlmodel.ext.asyncio.session import AsyncSession

from src.core.deps import get_db
from src.modules.common.coursework.schemas import (
    CourseworkCreate,
    CourseworkRead,
    CourseworkUpdate,
)
from src.modules.supervisor.deps import get_current_supervisor
from src.modules.supervisor.entities import Supervisor
from src.modules.supervisor_coursework.service import supervisor_coursework_service


router = APIRouter(prefix="/supervisor", tags=["Supervisor Coursework"])


@cbv(router)
class SupervisorCourseworkRouter:
    session: AsyncSession = Depends(get_db)

    # @router.get(path="/{supervisor_id}/courseworks")
    # async def get_supervisor_courseworks(
    #     self,
    #     supervisor_id: UUID,
    # ) -> list[CourseworkRead]:
    #     courseworks = await supervisor_coursework_service.read_courseworks(
    #         supervisor_id=supervisor_id,
    #         session=self.session,
    #     )
    #     return courseworks

    @router.get(path="/coursework/personal")
    async def get_supervisor_courseworks(
        self,
        current_supervisor: Supervisor = Depends(get_current_supervisor),
    ) -> list[CourseworkRead]:
        courseworks = await supervisor_coursework_service.read_courseworks(
            supervisor_id=current_supervisor.id,
            session=self.session,
        )
        return courseworks

    @router.get(path="/coursework/{coursework_id}")
    async def get_supervisor_coursework(
        self,
        coursework_id: UUID,
    ) -> CourseworkRead:
        coursework = await supervisor_coursework_service.read_coursework(
            coursework_id=coursework_id,
            session=self.session,
        )
        return coursework

    @router.post(path="/coursework/create")
    async def create_supervisor_coursework(
        self,
        coursework_create: CourseworkCreate,
        current_supervisor: Supervisor = Depends(get_current_supervisor),
    ) -> CourseworkRead:
        coursework = await supervisor_coursework_service.create_coursework(
            coursework_create=coursework_create,
            current_supervisor=current_supervisor,
            session=self.session,
        )
        return coursework

    @router.patch(path="/coursework/edit")
    async def edit_supervisor_coursework(
        self,
        coursework_update: CourseworkUpdate,
        current_supervisor: Supervisor = Depends(get_current_supervisor),
    ) -> CourseworkRead:
        coursework = await supervisor_coursework_service.update_coursework(
            coursework_update=coursework_update,
            current_supervisor=current_supervisor,
            session=self.session,
        )
        return coursework
