from sqlmodel.ext.asyncio.session import AsyncSession

from src.modules.student.entities import Student
from src.modules.supervisor.entities import Supervisor
from src.modules.recommender_system.entities.approve import Approve
from src.modules.recommender_system.repositories.approve import approve_repository
from src.modules.student_coursework.entities import StudentCoursework
from src.modules.student_coursework.service import student_coursework_service
from src.modules.supervisor_coursework.entities import SupervisorCoursework
from src.modules.supervisor_coursework.service import supervisor_coursework_service


class ApproveService:
    async def create_st_2_sv_cw_approve(
        self,
        student: Student,
        supervisor_coursework: SupervisorCoursework,
        session: AsyncSession,
    ) -> Approve:
        approve = await approve_repository.create_st_2_sv_cw_approve(
            st_id=student.id,
            sv_cw_id=supervisor_coursework.id,
            session=session,
        )
        return approve

    async def create_sv_2_st_cw_approve(
        self,
        supervisor: Supervisor,
        student_coursework: StudentCoursework,
        session: AsyncSession,
    ) -> Approve:
        approve = await approve_repository.create_sv_2_st_cw_approve(
            sv_id=supervisor.id,
            st_cw_id=student_coursework.id,
            session=session,
        )
        return approve

    async def read_st_approves(
        self,
        current_student: Student,
        session: AsyncSession,
    ) -> list[Approve]:
        st_approves: list[Approve] = []

        st_2_sv_cw_approves = await approve_repository.read_st_approves(
            st_id=current_student.id,
            session=session,
        )
        st_approves.extend(st_2_sv_cw_approves)

        student_courseworks = await student_coursework_service.read_courseworks(
            student_id=current_student.id,
            session=session,
        )
        for student_coursework in student_courseworks:
            sv_2_st_cw_approves = await approve_repository.read_st_approves(
                st_cw_id=student_coursework.id,
                session=session,
            )
            st_approves.extend(sv_2_st_cw_approves)

        return st_approves

    async def read_sv_approves(
        self,
        current_supervisor: Supervisor,
        session: AsyncSession,
    ) -> list[Approve]:
        sv_approves: list[Approve] = []

        sv_2_st_cw_approves = await approve_repository.read_sv_approves(
            sv_id=current_supervisor.id,
            session=session,
        )
        sv_approves.extend(sv_2_st_cw_approves)

        supervisor_courseworks = await supervisor_coursework_service.read_courseworks(
            supervisor_id=current_supervisor.id,
            session=session,
        )
        for supervisor_coursework in supervisor_courseworks:
            st_2_sv_cw_approves = await approve_repository.read_sv_approves(
                sv_cw_id=supervisor_coursework.id,
                session=session,
            )
            sv_approves.extend(st_2_sv_cw_approves)

        return sv_approves


approve_service = ApproveService()
