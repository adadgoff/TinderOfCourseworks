# TODO: implement validations and checks.

from uuid import UUID

from fastapi import HTTPException, status
from sqlmodel.ext.asyncio.session import AsyncSession

from src.modules.recommender_system.common.utils import get_common_skills_cnt
from src.modules.recommender_system.entities.st import St, StCw
from src.modules.recommender_system.entities.sv import Sv, SvCw
from src.modules.recommender_system.repositories.match import match_repository
from src.modules.recommender_system.repositories.st import (
    st_repository,
    st_cw_repository,
)
from src.modules.recommender_system.repositories.sv import (
    sv_repository,
    sv_cw_repository,
)


class RecSysService:
    async def recommend_st_for_sv_cw(
        self,
        sv_cw_id: UUID,
        session: AsyncSession,
    ) -> St:
        sts = await st_repository.read_sts(session=session)
        matches = await match_repository.read_sv_cw_2_st_matches(
            sv_cw_id=sv_cw_id,
            session=session,
        )
        used_sts_ids = set(match.st_id for match in matches)
        allowed_sts = [st for st in sts if st.id not in used_sts_ids]

        recommended_st: None | St = None
        max_common_skills_cnt = -1

        sv_cw = await sv_cw_repository.read_cw(
            cw_id=sv_cw_id,
            session=session,
        )
        for allowed_st in allowed_sts:
            common_skills_cnt = get_common_skills_cnt(
                skills_a=sv_cw.skills,
                skills_b=allowed_st.skills,
            )
            if common_skills_cnt > max_common_skills_cnt:
                recommended_st = allowed_st
                max_common_skills_cnt = common_skills_cnt

        if recommended_st is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Recommended `St` not found",
            )

        return recommended_st

    async def recommend_st_cw_for_sv(
        self,
        sv_id: UUID,
        session: AsyncSession,
    ) -> StCw:
        st_cws = await st_cw_repository.read_cws(session=session)
        matches = await match_repository.read_sv_2_st_cw_matches(
            sv_id=sv_id,
            session=session,
        )
        used_st_cws_ids = set(match.st_cw_id for match in matches)
        allowed_st_cws = [st_cw for st_cw in st_cws if st_cw.id not in used_st_cws_ids]

        recommended_st_cw: None | StCw = None
        max_common_skills_cnt = -1

        sv = await sv_repository.read_sv(
            sv_id=sv_id,
            session=session,
        )
        for allowed_st_cw in allowed_st_cws:
            common_skills_cnt = get_common_skills_cnt(
                skills_a=sv.skills,
                skills_b=allowed_st_cw.skills,
            )
            if common_skills_cnt > max_common_skills_cnt:
                recommended_st_cw = allowed_st_cw
                max_common_skills_cnt = common_skills_cnt

        if recommended_st_cw is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Recommended `St Cw` not found",
            )

        return recommended_st_cw

    async def recommend_sv_for_st_cw(
        self,
        st_cw_id: UUID,
        session: AsyncSession,
    ) -> Sv:
        svs = await sv_repository.read_svs(session=session)
        matches = await match_repository.read_st_cw_2_sv_matches(
            st_cw_id=st_cw_id,
            session=session,
        )
        used_svs_ids = set(match.sv_id for match in matches)
        allowed_svs = [sv for sv in svs if sv.id not in used_svs_ids]

        recommended_sv: None | Sv = None
        max_common_skills_cnt = -1

        st_cw = await st_cw_repository.read_cw(
            cw_id=st_cw_id,
            session=session,
        )
        for allowed_sv in allowed_svs:
            common_skills_cnt = get_common_skills_cnt(
                skills_a=st_cw.skills,
                skills_b=allowed_sv.skills,
            )
            if common_skills_cnt > max_common_skills_cnt:
                recommended_sv = allowed_sv
                max_common_skills_cnt = common_skills_cnt

        if recommended_sv is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Recommended `Sv` not found",
            )

        return recommended_sv

    async def recommend_sv_cw_for_st(
        self,
        st_id: UUID,
        session: AsyncSession,
    ) -> SvCw:
        sv_cws = await sv_cw_repository.read_cws(session=session)
        matches = await match_repository.read_st_2_sv_cw_matches(
            st_id=st_id,
            session=session,
        )
        used_sv_cws_ids = set(match.sv_cw_id for match in matches)
        allowed_sv_cws = [sv_cw for sv_cw in sv_cws if sv_cw.id not in used_sv_cws_ids]

        recommended_sv_cw: None | SvCw = None
        max_common_skills_cnt = -1

        st = await st_repository.read_st(
            st_id=st_id,
            session=session,
        )
        for allowed_st_cw in allowed_sv_cws:
            common_skills_cnt = get_common_skills_cnt(
                skills_a=st.skills,
                skills_b=allowed_st_cw.skills,
            )
            if common_skills_cnt > max_common_skills_cnt:
                recommended_sv_cw = allowed_st_cw
                max_common_skills_cnt = common_skills_cnt

        if recommended_sv_cw is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Recommended `Sv Cw` not found",
            )

        return recommended_sv_cw


recsys_service = RecSysService()
