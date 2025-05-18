from fastapi import APIRouter, FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.middleware.cors import CORSMiddleware

from src.modules.image.consts import STATIC_PATH
from src.core.config import settings
from src.modules.auth.router import router as auth_router
from src.modules.image.router import router as image_router
from src.modules.student.router import router as student_router
from src.modules.student_coursework.router import router as student_coursework_router
from src.modules.supervisor.router import router as supervisor_router
from src.modules.supervisor_coursework.router import (
    router as supervisor_coursework_router,
)
from src.modules.recommender_system.router import router as rec_sys_router


def custom_generate_unique_id(route: APIRouter) -> str:
    return f"{route.tags[0]}-{route.name}"


app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    generate_unique_id_function=custom_generate_unique_id,
)


app.include_router(auth_router)
app.include_router(student_router)
app.include_router(supervisor_router)
app.include_router(image_router)
app.include_router(student_coursework_router)
app.include_router(supervisor_coursework_router)
app.include_router(rec_sys_router)


app.mount(
    path=f"/{STATIC_PATH}",
    app=StaticFiles(directory=STATIC_PATH),
    name="Temporary File Storage",
)


if settings.all_cors_origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.all_cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


if __name__ == "__main__":
    from src.core.db import init_db, drop_db

    async def main():
        await drop_db()
        await init_db()

    import asyncio

    asyncio.run(main())
