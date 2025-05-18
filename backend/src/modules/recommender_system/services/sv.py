# TODO: implement validations.

from uuid import UUID

from fastapi import HTTPException, status
from sqlmodel.ext.asyncio.session import AsyncSession

from src.modules.recommender_system.entities.sv import Sv, SvCw
from src.modules.recommender_system.repositories.sv import (
    sv_repository,
    sv_cw_repository,
)


class SvService:
    async def create_sv(
        self,
        sv_create: Sv,
        session: AsyncSession,
    ) -> Sv:
        sv = await sv_repository.create_sv(
            sv_create=sv_create,
            session=session,
        )
        return sv

    async def read_sv(
        self,
        sv_id: UUID,
        session: AsyncSession,
    ) -> Sv:
        sv = await sv_repository.read_sv(
            sv_id=sv_id,
            session=session,
        )

        if sv is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Sv not found",
            )

        return sv

    async def update_sv(
        self,
        sv_update: Sv,
        session: AsyncSession,
    ) -> Sv:
        sv = await sv_repository.update_sv(
            sv_update=sv_update,
            session=session,
        )
        return sv


class SvCwService:
    async def create_cw(
        self,
        cw_create: SvCw,
        session: AsyncSession,
    ) -> SvCw:
        cw = await sv_cw_repository.create_cw(
            cw_create=cw_create,
            session=session,
        )
        return cw

    async def read_cw(
        self,
        cw_id: UUID,
        session: AsyncSession,
    ) -> SvCw:
        cw = await sv_cw_repository.read_cw(
            cw_id=cw_id,
            session=session,
        )

        if cw is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Sv Cw not found",
            )

        return cw

    async def update_cw(
        self,
        cw_update: SvCw,
        session: AsyncSession,
    ) -> SvCw:
        cw = await sv_cw_repository.update_cw(
            cw_update=cw_update,
            session=session,
        )
        return cw


sv_service = SvService()
sv_cw_service = SvCwService()
