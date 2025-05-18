from uuid import UUID

from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from src.modules.recommender_system.entities.approve import (
    Approve,
    ApproveSt2SvCw,
    ApproveSv2StCw,
)


class ApproveRepository:
    async def create_st_2_sv_cw_approve(
        self,
        st_id: UUID,
        sv_cw_id: UUID,
        session: AsyncSession,
    ) -> ApproveSt2SvCw:
        approve = ApproveSt2SvCw(
            st_id=st_id,
            sv_cw_id=sv_cw_id,
        )
        session.add(approve)
        await session.commit()
        return approve

    async def create_sv_2_st_cw_approve(
        self,
        sv_id: UUID,
        st_cw_id: UUID,
        session: AsyncSession,
    ) -> ApproveSv2StCw:
        approve = ApproveSv2StCw(
            sv_id=sv_id,
            st_cw_id=st_cw_id,
        )
        session.add(approve)
        await session.commit()
        return approve

    async def read_st_approves(
        self,
        *,
        st_id: UUID | None = None,
        st_cw_id: UUID | None = None,
        session: AsyncSession,
    ) -> list[Approve]:
        st_approves: list[Approve] = []

        if st_id is not None:
            statement = select(ApproveSt2SvCw).where(ApproveSt2SvCw.st_id == st_id)
            st_2_sv_cw_approves = (await session.exec(statement)).all()
            st_approves.extend(st_2_sv_cw_approves)

        if st_cw_id is not None:
            statement = select(ApproveSv2StCw).where(
                ApproveSv2StCw.st_cw_id == st_cw_id
            )
            sv_2_st_cw_approves = (await session.exec(statement)).all()
            st_approves.extend(sv_2_st_cw_approves)

        return st_approves

    async def read_sv_approves(
        self,
        *,
        sv_id: UUID | None = None,
        sv_cw_id: UUID | None = None,
        session: AsyncSession,
    ) -> list[Approve]:
        sv_approves: list[Approve] = []

        if sv_id is not None:
            statement = select(ApproveSv2StCw).where(ApproveSv2StCw.sv_id == sv_id)
            sv_2_st_cw_approves = (await session.exec(statement)).all()
            sv_approves.extend(sv_2_st_cw_approves)

        if sv_cw_id is not None:
            statement = select(ApproveSt2SvCw).where(
                ApproveSt2SvCw.sv_cw_id == sv_cw_id
            )
            st_2_sv_cw_approves = (await session.exec(statement)).all()
            sv_approves.extend(st_2_sv_cw_approves)

        return sv_approves


approve_repository = ApproveRepository()
