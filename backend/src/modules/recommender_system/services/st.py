# TODO: implement validations.

from uuid import UUID

from fastapi import HTTPException, status
from sqlmodel.ext.asyncio.session import AsyncSession

# from src.modules.recommender_system.schemas.st import (
#     StCreate,
#     StCwCreate,
#     StCwUpdate,
#     StUpdate,
# )
from src.modules.recommender_system.entities.st import St, StCw
from src.modules.recommender_system.repositories.st import (
    st_repository,
    st_cw_repository,
)


class StService:
    async def create_st(
        self,
        st_create: St,
        session: AsyncSession,
    ) -> St:
        st = await st_repository.create_st(
            st_create=st_create,
            session=session,
        )
        return st

    async def read_st(
        self,
        st_id: UUID,
        session: AsyncSession,
    ) -> St:
        st = await st_repository.read_st(
            st_id=st_id,
            session=session,
        )

        if st is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="St not found",
            )

        return st

    async def update_st(
        self,
        st_update: St,
        session: AsyncSession,
    ) -> St:
        st = await st_repository.update_st(
            st_update=st_update,
            session=session,
        )
        return st


class StCwService:
    async def create_cw(
        self,
        cw_create: StCw,
        session: AsyncSession,
    ) -> StCw:
        cw = await st_cw_repository.create_cw(
            cw_create=cw_create,
            session=session,
        )
        return cw

    async def read_cw(
        self,
        cw_id: UUID,
        session: AsyncSession,
    ) -> StCw:
        cw = await st_cw_repository.read_cw(
            cw_id=cw_id,
            session=session,
        )

        if cw is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="St Cw not found",
            )

        return cw

    async def update_cw(
        self,
        cw_update: StCw,
        session: AsyncSession,
    ) -> StCw:
        cw = await st_cw_repository.update_cw(
            cw_update=cw_update,
            session=session,
        )
        return cw


st_service = StService()
st_cw_service = StCwService()
