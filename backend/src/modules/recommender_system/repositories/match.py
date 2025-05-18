from uuid import UUID

from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from src.modules.recommender_system.entities.match import (
    MatchSt2SvCw,
    MatchStCw2Sv,
    MatchSv2StCw,
    MatchSvCw2St,
)
from src.modules.recommender_system.schemas.match import (
    MatchSt2SvCwCreate,
    MatchStCw2SvCreate,
    MatchSv2StCwCreate,
    MatchSvCw2StCreate,
)


class MatchRepository:
    async def read_st_2_sv_cw_matches(
        self,
        *,
        st_id: UUID | None = None,
        sv_cw_id: UUID | None = None,
        session: AsyncSession,
    ) -> list[MatchSt2SvCw]:
        statement = select(MatchSt2SvCw)
        if st_id is not None:
            statement = statement.where(MatchSt2SvCw.st_id == st_id)
        if sv_cw_id is not None:
            statement = statement.where(MatchSt2SvCw.sv_cw_id == sv_cw_id)
        matches = (await session.exec(statement)).all()
        return matches

    async def read_st_cw_2_sv_matches(
        self,
        *,
        st_cw_id: UUID | None = None,
        sv_id: UUID | None = None,
        session: AsyncSession,
    ) -> list[MatchStCw2Sv]:
        statement = select(MatchStCw2Sv)
        if st_cw_id is not None:
            statement = statement.where(MatchStCw2Sv.st_cw_id == st_cw_id)
        if sv_id is not None:
            statement = statement.where(MatchStCw2Sv.sv_id == sv_id)
        matches = (await session.exec(statement)).all()
        return matches

    async def read_sv_2_st_cw_matches(
        self,
        *,
        sv_id: UUID | None = None,
        st_cw_id: UUID | None = None,
        session: AsyncSession,
    ) -> list[MatchSv2StCw]:
        statement = select(MatchSv2StCw)
        if sv_id is not None:
            statement = statement.where(MatchSv2StCw.sv_id == sv_id)
        if st_cw_id is not None:
            statement = statement.where(MatchSv2StCw.st_cw_id == st_cw_id)
        matches = (await session.exec(statement)).all()
        return matches

    async def read_sv_cw_2_st_matches(
        self,
        *,
        sv_cw_id: UUID | None = None,
        st_id: UUID | None = None,
        session: AsyncSession,
    ) -> list[MatchSvCw2St]:
        statement = select(MatchSvCw2St)
        if sv_cw_id is not None:
            statement = statement.where(MatchSvCw2St.sv_cw_id == sv_cw_id)
        if st_id is not None:
            statement = statement.where(MatchSvCw2St.st_id == st_id)
        matches = (await session.exec(statement)).all()
        return matches

    async def read_st_2_sv_cw_match(
        self,
        st_id: UUID,
        sv_cw_id: UUID,
        session: AsyncSession,
    ) -> MatchSt2SvCw | None:
        statement = select(MatchSt2SvCw).where(
            MatchSt2SvCw.st_id == st_id,
            MatchSt2SvCw.sv_cw_id == sv_cw_id,
        )
        match = (await session.exec(statement)).first()
        return match

    async def read_st_cw_2_sv_match(
        self,
        st_cw_id: UUID,
        sv_id: UUID,
        session: AsyncSession,
    ) -> MatchStCw2Sv | None:
        statement = select(MatchStCw2Sv).where(
            MatchStCw2Sv.st_cw_id == st_cw_id,
            MatchStCw2Sv.sv_id == sv_id,
        )
        match = (await session.exec(statement)).first()
        return match

    async def read_sv_2_st_cw_match(
        self,
        sv_id: UUID,
        st_cw_id: UUID,
        session: AsyncSession,
    ) -> MatchSv2StCw | None:
        statement = select(MatchSv2StCw).where(
            MatchSv2StCw.sv_id == sv_id,
            MatchSv2StCw.st_cw_id == st_cw_id,
        )
        match = (await session.exec(statement)).first()
        return match

    async def read_sv_cw_2_st_match(
        self,
        sv_cw_id: UUID,
        st_id: UUID,
        session: AsyncSession,
    ) -> MatchSvCw2St | None:
        statement = select(MatchSvCw2St).where(
            MatchSvCw2St.sv_cw_id == sv_cw_id,
            MatchSvCw2St.st_id == st_id,
        )
        match = (await session.exec(statement)).first()
        return match

    async def create_st_2_sv_cw_match(
        self,
        *,
        match_create: MatchSt2SvCwCreate,
        st_id: UUID,
        session: AsyncSession,
    ) -> MatchSt2SvCw:
        match = MatchSt2SvCw(
            st_id=st_id,
            **match_create.model_dump(),
        )
        session.add(match)
        await session.commit()
        await session.refresh(match)
        return match

    async def create_st_cw_2_sv_match(
        self,
        *,
        match_create: MatchStCw2SvCreate,
        session: AsyncSession,
    ) -> MatchStCw2Sv:
        match = MatchStCw2Sv(**match_create.model_dump())
        session.add(match)
        await session.commit()
        await session.refresh(match)
        return match

    async def create_sv_2_st_cw_match(
        self,
        *,
        match_create: MatchSv2StCwCreate,
        sv_id: UUID,
        session: AsyncSession,
    ) -> MatchSv2StCw:
        match = MatchSv2StCw(
            sv_id=sv_id,
            **match_create.model_dump(),
        )
        session.add(match)
        await session.commit()
        await session.refresh(match)
        return match

    async def create_sv_cw_2_st_match(
        self,
        *,
        match_create: MatchSvCw2StCreate,
        session: AsyncSession,
    ) -> MatchSvCw2St:
        match = MatchSvCw2St(**match_create.model_dump())
        session.add(match)
        await session.commit()
        await session.refresh(match)
        return match

    # TODO: implement.

    # async def update_st_2_sv_cw_match(
    #     self,
    #     *,
    #     match_update: MatchSt2SvCwUpdate,
    #     session: AsyncSession,
    # ) -> MatchSt2SvCw:
    #     pass

    # async def update_st_cw_2_sv_match(
    #     self,
    #     *,
    #     match_update: MatchStCw2SvUpdate,
    #     session: AsyncSession,
    # ) -> MatchStCw2Sv:
    #     pass

    # async def update_sv_2_st_cw_match(
    #     self,
    #     *,
    #     match_update: MatchSv2StCwUpdate,
    #     session: AsyncSession,
    # ) -> MatchSv2StCw:
    #     pass

    # async def update_sv_cw_2_st_match(
    #     self,
    #     *,
    #     match_update: MatchSvCw2StUpdate,
    #     session: AsyncSession,
    # ) -> MatchSvCw2St:
    #     pass


match_repository = MatchRepository()
