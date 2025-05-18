from uuid import UUID

from fastapi import APIRouter, Depends
from fastapi_utils.cbv import cbv
from sqlmodel.ext.asyncio.session import AsyncSession

from src.core.deps import get_db
from src.modules.common.coursework.schemas import (
    CourseworkCreate,
    CourseworkRead,
    CourseworkUpdate,
)
from src.modules.student.deps import get_current_student
from src.modules.student.entities import Student
from src.modules.student_coursework.service import student_coursework_service


router = APIRouter(prefix="/student", tags=["Student Coursework"])


@cbv(router)
class StudentCourseworkRouter:
    session: AsyncSession = Depends(get_db)

    @router.get(path="/{student_id}/courseworks")
    async def get_student_courseworks(
        self,
        student_id: UUID,
    ) -> list[CourseworkRead]:
        courseworks = await student_coursework_service.read_courseworks(
            student_id=student_id,
            session=self.session,
        )
        return courseworks

    @router.get(path="/coursework/{coursework_id}")
    async def get_student_coursework(
        self,
        coursework_id: UUID,
    ) -> CourseworkRead:
        coursework = await student_coursework_service.read_coursework(
            coursework_id=coursework_id,
            session=self.session,
        )
        return coursework

    @router.post(path="/coursework/create")
    async def create_student_coursework(
        self,
        coursework_create: CourseworkCreate,
        current_student: Student = Depends(get_current_student),
    ) -> CourseworkRead:
        coursework = await student_coursework_service.create_coursework(
            coursework_create=coursework_create,
            current_student=current_student,
            session=self.session,
        )
        return coursework

    @router.patch(path="/coursework/edit")
    async def edit_student_coursework(
        self,
        coursework_update: CourseworkUpdate,
        current_student: Student = Depends(get_current_student),
    ) -> CourseworkRead:
        coursework = await student_coursework_service.update_coursework(
            coursework_update=coursework_update,
            current_student=current_student,
            session=self.session,
        )
        return coursework
