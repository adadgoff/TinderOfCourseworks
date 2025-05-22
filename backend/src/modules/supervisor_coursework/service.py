from uuid import UUID

from fastapi import HTTPException, status
from sqlmodel.ext.asyncio.session import AsyncSession

from src.modules.common.coursework.schemas import CourseworkCreate, CourseworkUpdate
from src.modules.supervisor.entities import Supervisor
from src.modules.supervisor.service import supervisor_service
from src.modules.supervisor_coursework.entities import SupervisorCoursework
from src.modules.supervisor_coursework.repository import (
    supervisor_coursework_repository,
)
from src.modules.recommender_system.entities.sv import SvCw
from src.modules.recommender_system.services.sv import sv_cw_service


class SupervisorCourseworkService:
    async def create_coursework(
        self,
        coursework_create: CourseworkCreate,
        current_supervisor: Supervisor,
        session: AsyncSession,
    ) -> SupervisorCoursework:
        coursework = await supervisor_coursework_repository.create_coursework(
            coursework_create=coursework_create,
            supervisor_id=current_supervisor.id,
            session=session,
        )

        await session.refresh(current_supervisor)
        await sv_cw_service.create_cw(
            cw_create=SvCw(**coursework.model_dump()),
            session=session,
        )

        await session.refresh(coursework)
        return coursework

    async def read_coursework(
        self,
        coursework_id: UUID,
        session: AsyncSession,
    ) -> SupervisorCoursework:
        coursework = await supervisor_coursework_repository.read_coursework(
            coursework_id=coursework_id,
            session=session,
        )

        if coursework is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Supervisor Coursework not found",
            )

        return coursework

    async def read_courseworks(
        self,
        supervisor_id: UUID,
        session: AsyncSession,
    ) -> list[SupervisorCoursework]:
        # Check supervisor existence.
        await supervisor_service.read_supervisor(
            supervisor_id=supervisor_id,
            session=session,
        )

        courseworks = await supervisor_coursework_repository.read_courseworks(
            supervisor_id=supervisor_id,
            session=session,
        )

        return courseworks

    async def update_coursework(
        self,
        coursework_update: CourseworkUpdate,
        current_supervisor: Supervisor,
        session: AsyncSession,
    ) -> SupervisorCoursework:
        # Check coursework existence.
        coursework = await self.read_coursework(
            coursework_id=coursework_update.id,
            session=session,
        )

        if coursework.supervisor_id != current_supervisor.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Supervisor not allowed to update this coursework",
            )

        coursework = await supervisor_coursework_repository.update_coursework(
            coursework_update=coursework_update,
            session=session,
        )

        await sv_cw_service.update_cw(
            cw_update=SvCw(**coursework_update.model_dump()),
            session=session,
        )

        await session.refresh(coursework)
        return coursework


supervisor_coursework_service = SupervisorCourseworkService()
