import asyncio

from uuid import uuid4


from sqlalchemy.ext.asyncio import async_sessionmaker


from adomains import (
    Student,
    Supervisor,
)
from badapters.orms import (
    engine,
    init_db,
)


async def main():
    await init_db()
    async_session = async_sessionmaker(
        bind=engine,
        expire_on_commit=False,
    )
    s = Student(
        uuid=uuid4(),
        email="qqq@mail.ru",
        password="qqepta123123",
    )
    sv = Supervisor(
        uuid=uuid4(),
        email="valid@mail.ru",
        password="12345678",
    )
    
    async with async_session() as session:
        session.add(s)
        session.add(sv)
        await session.commit()


if __name__ == "__main__":
    asyncio.run(
        main=main(),
    )
