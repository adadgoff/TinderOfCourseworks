from fastapi import APIRouter

from src.modules.recommender_system.routers.match_st import router as match_st_router
from src.modules.recommender_system.routers.match_sv import router as match_sv_router
from src.modules.recommender_system.routers.recsys import router as recsys_router


router = APIRouter()

router.include_router(match_st_router)
router.include_router(match_sv_router)
router.include_router(recsys_router)
