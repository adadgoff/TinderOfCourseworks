from fastapi import APIRouter, Depends
from fastapi_utils.cbv import cbv
from sqlmodel.ext.asyncio.session import AsyncSession

from src.core.deps import get_db
from src.modules.recommender_system.schemas.approve import ApproveRead
from src.modules.recommender_system.schemas.match import (
    MatchSt2SvCwRead,
    MatchStCw2SvRead,
    MatchSv2StCwCreate,
    MatchSv2StCwRead,
    MatchSvCw2StCreate,
    MatchSvCw2StRead,
)
from src.modules.recommender_system.services.approve import approve_service
from src.modules.recommender_system.services.match import match_service
from src.modules.supervisor.deps import get_current_supervisor
from src.modules.supervisor.entities import Supervisor


router = APIRouter(prefix="/supervisor/match", tags=["Supervisor Matches"])


@cbv(router)
class MatchSvRouter:
    session: AsyncSession = Depends(get_db)
    current_supervisor: Supervisor = Depends(get_current_supervisor)

    @router.get(path="/incomes")  # `Matches History` from frontend.
    async def get_sv_income_matches(self) -> list[MatchStCw2SvRead | MatchSt2SvCwRead]:
        income_matches = await match_service.read_sv_income_matches(
            current_supervisor=self.current_supervisor,
            session=self.session,
        )
        return income_matches

    @router.get(path="/outcomes")  # `Explore History` from frontend.
    async def get_sv_outcome_matches(self) -> list[MatchSv2StCwRead | MatchSvCw2StRead]:
        outcome_matches = await match_service.read_sv_outcome_matches(
            current_supervisor=self.current_supervisor,
            session=self.session,
        )
        return outcome_matches

    @router.get(path="/approves")
    async def get_sv_approves(self) -> list[ApproveRead]:
        approves = await approve_service.read_sv_approves(
            current_supervisor=self.current_supervisor,
            session=self.session,
        )
        return approves

    @router.post(path="/sv2stcw")
    async def post_sv_2_st_cw_match(
        self,
        match_create: MatchSv2StCwCreate,
    ) -> MatchSv2StCwRead:
        match = await match_service.create_sv_2_st_cw_match(
            match_create=match_create,
            current_supervisor=self.current_supervisor,
            session=self.session,
        )
        return match

    @router.post(path="/svcw2st")
    async def post_sv_cw_2_st_match(
        self,
        match_create: MatchSvCw2StCreate,
    ) -> MatchSvCw2StRead:
        match = await match_service.create_sv_cw_2_st_match(
            match_create=match_create,
            current_supervisor=self.current_supervisor,
            session=self.session,
        )
        return match

    # TODO: implement update.
