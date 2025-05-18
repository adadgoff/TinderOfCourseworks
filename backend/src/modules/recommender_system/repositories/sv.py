# TODO: implement validations.

from uuid import UUID

from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

# from src.modules.recommender_system.schemas.sv import (
#     SvCreate,
#     SvCwCreate,
#     SvCwUpdate,
#     SvUpdate,
# )
from src.modules.recommender_system.entities.sv import Sv, SvCw


class SvRepository:
    async def create_sv(
        self,
        sv_create: Sv,
        session: AsyncSession,
    ) -> Sv:
        sv = Sv(**sv_create.model_dump())
        session.add(sv)
        await session.commit()
        return sv

    async def read_sv(
        self,
        sv_id: UUID,
        session: AsyncSession,
    ) -> Sv | None:
        sv = await session.get(
            entity=Sv,
            ident=sv_id,
        )
        return sv

    async def read_svs(
        self,
        session: AsyncSession,
    ) -> list[Sv]:
        statement = select(Sv)
        svs = (await session.exec(statement)).all()
        return svs

    async def update_sv(
        self,
        sv_update: Sv,
        session: AsyncSession,
    ) -> Sv:
        sv = await self.read_sv(
            sv_id=sv_update.id,
            session=session,
        )
        sv.skills = sv_update.skills
        session.add(sv)
        await session.commit()
        return sv


class SvCwRepository:
    async def create_cw(
        self,
        cw_create: SvCw,
        session: AsyncSession,
    ) -> SvCw:
        cw = SvCw(**cw_create.model_dump())
        session.add(cw)
        await session.commit()
        return cw

    async def read_cw(
        self,
        cw_id: UUID,
        session: AsyncSession,
    ) -> SvCw | None:
        cw = await session.get(
            entity=SvCw,
            ident=cw_id,
        )
        return cw

    async def read_cws(
        self,
        session: AsyncSession,
    ) -> list[SvCw]:
        statement = select(SvCw)
        cws = (await session.exec(statement)).all()
        return cws

    async def update_cw(
        self,
        cw_update: SvCw,
        session: AsyncSession,
    ) -> SvCw:
        cw = await self.read_cw(
            cw_id=cw_update.id,
            session=session,
        )
        cw.skills = cw_update.skills
        session.add(cw)
        await session.commit()
        return cw


sv_repository = SvRepository()
sv_cw_repository = SvCwRepository()
