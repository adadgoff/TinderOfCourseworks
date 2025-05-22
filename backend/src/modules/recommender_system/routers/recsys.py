from uuid import UUID

from fastapi import APIRouter, Depends
from fastapi_utils.cbv import cbv
from sqlmodel.ext.asyncio.session import AsyncSession

from src.core.deps import get_db
from src.modules.recommender_system.schemas.recsys import (
    RecStRead,
    RecStCwRead,
    RecSvRead,
    RecSvCwRead,
)
from src.modules.recommender_system.services.recsys import recsys_service
from src.modules.student.deps import get_current_student
from src.modules.student.entities import Student
from src.modules.supervisor.deps import get_current_supervisor
from src.modules.supervisor.entities import Supervisor


router = APIRouter(prefix="/recsys", tags=["Recommender System"])


@cbv(router)
class RecSysRouter:
    session: AsyncSession = Depends(get_db)

    @router.get(path="/st2svcw", dependencies=[Depends(get_current_supervisor)])
    async def recommend_st(
        self,
        sv_cw_id: UUID,
    ) -> RecStRead | None:
        recommended_st = await recsys_service.recommend_st_for_sv_cw(
            sv_cw_id=sv_cw_id,
            session=self.session,
        )
        if recommended_st is None:
            return None
        return RecStRead(st_id=recommended_st.id)

    @router.get(path="/stcw2sv")
    async def recommend_st_cw(
        self,
        current_supervisor: Supervisor = Depends(get_current_supervisor),
    ) -> RecStCwRead | None:
        recommended_st_cw = await recsys_service.recommend_st_cw_for_sv(
            sv_id=current_supervisor.id,
            session=self.session,
        )
        if recommended_st_cw is None:
            return None
        return RecStCwRead(st_cw_id=recommended_st_cw.id)

    @router.get(path="/sv2stcw", dependencies=[Depends(get_current_student)])
    async def recommend_sv(
        self,
        st_cw_id: UUID,
    ) -> RecSvRead | None:
        recommended_sv = await recsys_service.recommend_sv_for_st_cw(
            st_cw_id=st_cw_id,
            session=self.session,
        )
        if recommended_sv is None:
            return None
        return RecSvRead(sv_id=recommended_sv.id)

    @router.get(path="/svcw2st")
    async def recommend_sv_cw(
        self,
        current_student: Student = Depends(get_current_student),
    ) -> RecSvCwRead | None:
        recommended_sv_cw = await recsys_service.recommend_sv_cw_for_st(
            st_id=current_student.id,
            session=self.session,
        )
        if recommended_sv_cw is None:
            return None
        return RecSvCwRead(sv_cw_id=recommended_sv_cw.id)
