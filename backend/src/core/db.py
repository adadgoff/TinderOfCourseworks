from sqlalchemy.ext.asyncio import create_async_engine
from sqlmodel import SQLModel

from src.core.config import settings

engine = create_async_engine(url=str(settings.SQLALCHEMY_DATABASE_URI))


async def init_db():
    async with engine.begin() as connection:
        await connection.run_sync(fn=SQLModel.metadata.create_all)


async def drop_db():
    async with engine.begin() as connection:
        await connection.run_sync(fn=SQLModel.metadata.drop_all)
