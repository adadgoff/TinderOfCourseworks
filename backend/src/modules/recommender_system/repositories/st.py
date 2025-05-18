# TODO: implement validations.

from uuid import UUID

from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

# from src.modules.recommender_system.schemas.st import (
#     StCreate,
#     StCwCreate,
#     StCwUpdate,
#     StUpdate,
# )
from src.modules.recommender_system.entities.st import St, StCw


class StRepository:
    async def create_st(
        self,
        st_create: St,
        session: AsyncSession,
    ) -> St:
        st = St(**st_create.model_dump())
        session.add(st)
        await session.commit()
        return st

    async def read_st(
        self,
        st_id: UUID,
        session: AsyncSession,
    ) -> St | None:
        st = await session.get(
            entity=St,
            ident=st_id,
        )
        return st

    async def read_sts(
        self,
        session: AsyncSession,
    ) -> list[St]:
        statement = select(St)
        sts = (await session.exec(statement)).all()
        return sts

    async def update_st(
        self,
        st_update: St,
        session: AsyncSession,
    ) -> St:
        st = await self.read_st(
            st_id=st_update.id,
            session=session,
        )
        st.skills = st_update.skills
        session.add(st)
        await session.commit()
        return st


class StCwRepository:
    async def create_cw(
        self,
        cw_create: StCw,
        session: AsyncSession,
    ) -> StCw:
        cw = StCw(**cw_create.model_dump())
        session.add(cw)
        await session.commit()
        return cw

    async def read_cw(
        self,
        cw_id: UUID,
        session: AsyncSession,
    ) -> StCw | None:
        cw = await session.get(
            entity=StCw,
            ident=cw_id,
        )
        return cw

    async def read_cws(
        self,
        session: AsyncSession,
    ) -> list[StCw]:
        statement = select(StCw)
        cws = (await session.exec(statement)).all()
        return cws

    async def update_cw(
        self,
        cw_update: StCw,
        session: AsyncSession,
    ) -> StCw:
        cw = await self.read_cw(
            cw_id=cw_update.id,
            session=session,
        )
        cw.skills = cw_update.skills
        session.add(cw)
        await session.commit()
        return cw


st_repository = StRepository()
st_cw_repository = StCwRepository()
