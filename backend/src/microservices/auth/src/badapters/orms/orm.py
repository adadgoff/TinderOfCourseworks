from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import registry

from config import settings


engine = create_async_engine(
    url=str(settings.SQLALCHEMY_DATABASE_URI),
)
mapper_registry = registry()


async def init_db() -> None:
    async with engine.begin() as connection:
        await connection.run_sync(
            fn=mapper_registry.metadata.drop_all,
        )
        await connection.run_sync(
            fn=mapper_registry.metadata.create_all,
        )
