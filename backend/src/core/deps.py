from typing import Annotated, AsyncGenerator

from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from sqlmodel.ext.asyncio.session import AsyncSession

from src.core.config import settings
from src.core.db import engine


reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/login/supervisor",
)


TokenDep = Annotated[str, Depends(reusable_oauth2)]


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSession(bind=engine) as session:
        yield session


SessionDep = Annotated[AsyncSession, Depends(get_db)]
