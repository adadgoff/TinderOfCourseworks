from fastapi import APIRouter, Depends
from fastapi_utils.cbv import cbv
from sqlmodel.ext.asyncio.session import AsyncSession

from src.core.deps import get_db
from src.modules.recommender_system.schemas.approve import ApproveRead
from src.modules.recommender_system.schemas.match import (
    MatchSt2SvCwCreate,
    MatchSt2SvCwRead,
    MatchStCw2SvCreate,
    MatchStCw2SvRead,
    MatchSv2StCwRead,
    MatchSvCw2StRead,
)
from src.modules.recommender_system.services.approve import approve_service
from src.modules.recommender_system.services.match import match_service
from src.modules.student.deps import get_current_student
from src.modules.student.entities import Student


router = APIRouter(prefix="/student/match", tags=["Student Matches"])


@cbv(router)
class MatchStRouter:
    session: AsyncSession = Depends(get_db)
    current_student: Student = Depends(get_current_student)

    @router.get(path="/incomes")  # `Matches History` from frontend.
    async def get_st_income_matches(self) -> list[MatchSvCw2StRead | MatchSv2StCwRead]:
        income_matches = await match_service.read_st_income_matches(
            current_student=self.current_student,
            session=self.session,
        )
        return income_matches

    @router.get(path="/outcomes")  # `Explore History` from frontend.
    async def get_st_outcome_matches(self) -> list[MatchSt2SvCwRead | MatchStCw2SvRead]:
        outcome_matches = await match_service.read_st_outcome_matches(
            current_student=self.current_student,
            session=self.session,
        )
        return outcome_matches

    @router.get(path="/approves")
    async def get_st_approves(self) -> list[ApproveRead]:
        approves = await approve_service.read_st_approves(
            current_student=self.current_student,
            session=self.session,
        )
        return approves

    @router.post(path="/st2svcw")
    async def post_st_2_sv_cw_match(
        self,
        match_create: MatchSt2SvCwCreate,
    ) -> MatchSt2SvCwRead:
        match = await match_service.create_st_2_sv_cw_match(
            match_create=match_create,
            current_student=self.current_student,
            session=self.session,
        )
        return match

    @router.post(path="/stcw2sv")
    async def post_st_cw_2_sv_match(
        self,
        match_create: MatchStCw2SvCreate,
    ) -> MatchStCw2SvRead:
        match = await match_service.create_st_cw_2_sv_match(
            match_create=match_create,
            current_student=self.current_student,
            session=self.session,
        )
        return match

    # TODO: implement.

    # @router.patch(path="/match/st_2_sv_cw")
    # async def patch_st_2_sv_cw_match(
    #     self,
    #     match_update: MatchSt2SvCwUpdate,
    # ) -> MatchSt2SvCw:
    #     match = await match_service.update_st_2_sv_cw_match(
    #         match_update=match_update,
    #         session=self.session,
    #     )
    #     return match

    # @router.patch(path="/match/st_cw_2_sv")
    # async def patch_st_cw_2_sv_match(
    #     self,
    #     match_update: MatchStCw2SvUpdate,
    # ) -> MatchStCw2Sv:
    #     match = await match_service.update_st_cw_2_sv_match(
    #         match_update=match_update,
    #         session=self.session,
    #     )
    #     return match
