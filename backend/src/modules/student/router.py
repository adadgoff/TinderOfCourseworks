from uuid import UUID

from fastapi import APIRouter, Depends
from fastapi_utils.cbv import cbv
from sqlmodel.ext.asyncio.session import AsyncSession

from src.core.deps import get_db
from src.modules.student.entities import Student
from src.modules.student.deps import get_current_student
from src.modules.student.schemas import StudentRead, StudentUpdate
from src.modules.student.service import student_service


router = APIRouter(prefix="/student", tags=["Student"])


@cbv(router)
class StudentRouter:
    session: AsyncSession = Depends(get_db)

    @router.get(path="/personal")
    async def get_student_personal(
        self,
        current_student: Student = Depends(get_current_student),
    ) -> StudentRead:
        student = await student_service.read_student(
            student_id=current_student.id,
            session=self.session,
        )
        return student

    @router.get(path="/{student_id}")
    async def get_student(
        self,
        student_id: UUID,
    ) -> StudentRead:
        student = await student_service.read_student(
            student_id=student_id,
            session=self.session,
        )
        return student

    @router.patch(path="/edit")
    async def edit_student(
        self,
        student_update: StudentUpdate,
        current_student: Student = Depends(get_current_student),
    ) -> StudentRead:
        student = await student_service.update_student(
            student_update=student_update,
            current_student=current_student,
            session=self.session,
        )
        return student
