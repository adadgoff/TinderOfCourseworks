from fastapi import HTTPException, status
from sqlmodel.ext.asyncio.session import AsyncSession

from src.modules.student.entities import Student
from src.modules.student.service import student_service
from src.modules.student_coursework.entities import StudentCoursework
from src.modules.student_coursework.service import student_coursework_service

from src.modules.supervisor.entities import Supervisor
from src.modules.supervisor.service import supervisor_service
from src.modules.supervisor_coursework.entities import SupervisorCoursework
from src.modules.supervisor_coursework.service import supervisor_coursework_service

from src.modules.recommender_system.services.approve import approve_service
from src.modules.recommender_system.entities.match import (
    MatchSt2SvCw,
    MatchStCw2Sv,
    MatchSv2StCw,
    MatchSvCw2St,
)
from src.modules.recommender_system.repositories.match import match_repository
from src.modules.recommender_system.schemas.match import (
    MatchSt2SvCwCreate,
    MatchStCw2SvCreate,
    MatchSv2StCwCreate,
    MatchSvCw2StCreate,
)


class MatchService:
    async def read_st_income_matches(
        self,
        current_student: Student,
        session: AsyncSession,
    ) -> list[MatchSvCw2St | MatchSv2StCw]:
        st_income_matches: list[MatchSvCw2St | MatchSv2StCw] = []

        sv_cw_2_st_matches = await match_repository.read_sv_cw_2_st_matches(
            st_id=current_student.id,
            session=session,
        )
        st_income_matches.extend(sv_cw_2_st_matches)

        student_courseworks = await student_coursework_service.read_courseworks(
            student_id=current_student.id,
            session=session,
        )
        for student_coursework in student_courseworks:
            sv_2_st_cw_matches = await match_repository.read_sv_2_st_cw_matches(
                st_cw_id=student_coursework.id,
                session=session,
            )
            st_income_matches.extend(sv_2_st_cw_matches)

        return st_income_matches

    async def read_st_outcome_matches(
        self,
        current_student: Student,
        session: AsyncSession,
    ) -> list[MatchSt2SvCw | MatchStCw2Sv]:
        st_outcome_matches: list[MatchSt2SvCw | MatchStCw2Sv] = []

        st_2_sv_cw_matches = await match_repository.read_st_2_sv_cw_matches(
            st_id=current_student.id,
            session=session,
        )
        st_outcome_matches.extend(st_2_sv_cw_matches)

        student_courseworks = await student_coursework_service.read_courseworks(
            student_id=current_student.id,
            session=session,
        )
        for student_coursework in student_courseworks:
            st_cw_2_sv_matches = await match_repository.read_st_cw_2_sv_matches(
                st_cw_id=student_coursework.id,
                session=session,
            )
            st_outcome_matches.extend(st_cw_2_sv_matches)

        return st_outcome_matches

    async def read_sv_income_matches(
        self,
        current_supervisor: Supervisor,
        session: AsyncSession,
    ) -> list[MatchStCw2Sv | MatchSt2SvCw]:
        sv_income_matches: list[MatchStCw2Sv | MatchSt2SvCw] = []

        st_cw_2_sv_matches = await match_repository.read_st_cw_2_sv_matches(
            sv_id=current_supervisor.id,
            session=session,
        )
        sv_income_matches.extend(st_cw_2_sv_matches)

        supervisor_courseworks = await supervisor_coursework_service.read_courseworks(
            supervisor_id=current_supervisor.id,
            session=session,
        )
        for supervisor_coursework in supervisor_courseworks:
            st_2_sv_cw_matches = await match_repository.read_st_2_sv_cw_matches(
                sv_cw_id=supervisor_coursework.id,
                session=session,
            )
            sv_income_matches.extend(st_2_sv_cw_matches)

        return sv_income_matches

    async def read_sv_outcome_matches(
        self,
        current_supervisor: Supervisor,
        session: AsyncSession,
    ) -> list[MatchSv2StCw | MatchSvCw2St]:
        sv_outcome_matches: list[MatchSv2StCw | MatchSvCw2St] = []

        sv_2_st_cw_matches = await match_repository.read_sv_2_st_cw_matches(
            sv_id=current_supervisor.id,
            session=session,
        )
        sv_outcome_matches.extend(sv_2_st_cw_matches)

        supervisor_courseworks = await supervisor_coursework_service.read_courseworks(
            supervisor_id=current_supervisor.id,
            session=session,
        )
        for supervisor_coursework in supervisor_courseworks:
            sv_cw_2_st_matches = await match_repository.read_sv_cw_2_st_matches(
                sv_cw_id=supervisor_coursework.id,
                session=session,
            )
            sv_outcome_matches.extend(sv_cw_2_st_matches)

        return sv_outcome_matches

    async def read_st_2_sv_cw_match(
        self,
        student: Student,
        supervisor_coursework: SupervisorCoursework,
        session: AsyncSession,
    ) -> MatchSt2SvCw | None:
        match = await match_repository.read_st_2_sv_cw_match(
            st_id=student.id,
            sv_cw_id=supervisor_coursework.id,
            session=session,
        )
        if match is not None:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Match `St2SvCw` already exists",
            )
        return match

    async def read_st_cw_2_sv_match(
        self,
        student_coursework: StudentCoursework,
        supervisor: Supervisor,
        session: AsyncSession,
    ) -> MatchStCw2Sv | None:
        match = await match_repository.read_st_cw_2_sv_match(
            st_cw_id=student_coursework.id,
            sv_id=supervisor.id,
            session=session,
        )
        if match is not None:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Match `StCw2Sv` already exists",
            )
        return match

    async def read_sv_2_st_cw_match(
        self,
        supervisor: Supervisor,
        student_coursework: StudentCoursework,
        session: AsyncSession,
    ) -> MatchSv2StCw | None:
        match = await match_repository.read_sv_2_st_cw_match(
            sv_id=supervisor.id,
            st_cw_id=student_coursework.id,
            session=session,
        )
        if match is not None:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Match `Sv2StCw` already exists",
            )
        return match

    async def read_sv_cw_2_st_match(
        self,
        supervisor_coursework: SupervisorCoursework,
        student: Student,
        session: AsyncSession,
    ) -> MatchSvCw2St | None:
        match = await match_repository.read_sv_cw_2_st_match(
            sv_cw_id=supervisor_coursework.id,
            st_id=student.id,
            session=session,
        )
        if match is not None:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Match `SvCw2St` already exists",
            )
        return match

    async def create_st_2_sv_cw_match(
        self,
        match_create: MatchSt2SvCwCreate,
        current_student: Student,
        session: AsyncSession,
    ) -> MatchSt2SvCw:
        # Check supervisor coursework existence.
        supervisor_coursework = await supervisor_coursework_service.read_coursework(
            coursework_id=match_create.sv_cw_id,
            session=session,
        )
        # Check match existence.
        await self.read_st_2_sv_cw_match(
            student=current_student,
            supervisor_coursework=supervisor_coursework,
            session=session,
        )

        match = await match_repository.create_st_2_sv_cw_match(
            match_create=match_create,
            st_id=current_student.id,
            session=session,
        )

        await session.refresh(current_student)
        await session.refresh(supervisor_coursework)
        reverse_match = await match_repository.read_sv_cw_2_st_match(
            sv_cw_id=match_create.sv_cw_id,
            st_id=current_student.id,
            session=session,
        )
        if reverse_match is not None:
            await approve_service.create_st_2_sv_cw_approve(
                student=current_student,
                supervisor_coursework=supervisor_coursework,
                session=session,
            )

        return match

    async def create_st_cw_2_sv_match(
        self,
        match_create: MatchStCw2SvCreate,
        current_student: Student,
        session: AsyncSession,
    ) -> MatchStCw2Sv:
        # Check student coursework existence.
        student_coursework = await student_coursework_service.read_coursework(
            coursework_id=match_create.st_cw_id,
            session=session,
        )
        # Check supervisor existence.
        supervisor = await supervisor_service.read_supervisor(
            supervisor_id=match_create.sv_id,
            session=session,
        )
        # Check student coursework owner.
        if student_coursework.student_id != current_student.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Student not allowed to create match with not own student coursework",
            )
        # Check match existence.
        await self.read_st_cw_2_sv_match(
            student_coursework=student_coursework,
            supervisor=supervisor,
            session=session,
        )

        match = await match_repository.create_st_cw_2_sv_match(
            match_create=match_create,
            session=session,
        )

        await session.refresh(student_coursework)
        await session.refresh(supervisor)
        reverse_match = await match_repository.read_sv_2_st_cw_match(
            sv_id=match_create.sv_id,
            st_cw_id=match_create.st_cw_id,
            session=session,
        )
        if reverse_match is not None:
            await approve_service.create_sv_2_st_cw_approve(
                supervisor=supervisor,
                student_coursework=student_coursework,
                session=session,
            )

        await session.refresh(match)
        return match

    async def create_sv_2_st_cw_match(
        self,
        match_create: MatchSv2StCwCreate,
        current_supervisor: Supervisor,
        session: AsyncSession,
    ) -> MatchSv2StCw:
        # Check student coursework existence.
        student_coursework = await student_coursework_service.read_coursework(
            coursework_id=match_create.st_cw_id,
            session=session,
        )
        # Check match existence.
        await self.read_sv_2_st_cw_match(
            supervisor=current_supervisor,
            student_coursework=student_coursework,
            session=session,
        )

        match = await match_repository.create_sv_2_st_cw_match(
            match_create=match_create,
            sv_id=current_supervisor.id,
            session=session,
        )

        await session.refresh(current_supervisor)
        await session.refresh(student_coursework)
        reverse_match = await match_repository.read_st_cw_2_sv_match(
            st_cw_id=match_create.st_cw_id,
            sv_id=current_supervisor.id,
            session=session,
        )
        if reverse_match is not None:
            await approve_service.create_sv_2_st_cw_approve(
                supervisor=current_supervisor,
                student_coursework=student_coursework,
                session=session,
            )

        return match

    async def create_sv_cw_2_st_match(
        self,
        match_create: MatchSvCw2StCreate,
        current_supervisor: Supervisor,
        session: AsyncSession,
    ) -> MatchSvCw2St:
        # Check supervisor coursework existence.
        supervisor_coursework = await supervisor_coursework_service.read_coursework(
            coursework_id=match_create.sv_cw_id,
            session=session,
        )
        # Check student existence.
        student = await student_service.read_student(
            student_id=match_create.st_id,
            session=session,
        )
        # Check supervisor coursework owner.
        if supervisor_coursework.supervisor_id != current_supervisor.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Supervisor not allowed to create match with not own supervisor coursework",
            )
        # Check match existence.
        await self.read_sv_cw_2_st_match(
            supervisor_coursework=supervisor_coursework,
            student=student,
            session=session,
        )
        match = await match_repository.create_sv_cw_2_st_match(
            match_create=match_create,
            session=session,
        )

        await session.refresh(supervisor_coursework)
        await session.refresh(student)
        reverse_match = await match_repository.read_st_2_sv_cw_match(
            st_id=match_create.st_id,
            sv_cw_id=match_create.sv_cw_id,
            session=session,
        )
        if reverse_match is not None:
            await approve_service.create_st_2_sv_cw_approve(
                student=student,
                supervisor_coursework=supervisor_coursework,
                session=session,
            )

        return match

    # TODO: implement.

    # async def update_st_2_sv_cw_match(
    #     self,
    #     match_update: MatchSt2SvCwUpdate,
    #     current_student: Student,
    #     session: AsyncSession,
    # ) -> MatchSt2SvCw:
    #     pass

    # async def update_st_cw_2_sv_match(
    #     self,
    #     match_update: MatchStCw2SvUpdate,
    #     current_student: Student,
    #     session: AsyncSession,
    # ) -> MatchStCw2Sv:
    #     pass

    # async def update_sv_2_st_cw_match(
    #     self,
    #     match_update: MatchSv2StCwUpdate,
    #     current_supervisor: Supervisor,
    #     session: AsyncSession,
    # ) -> MatchSv2StCw:
    #     pass

    # async def update_sv_cw_2_st_match(
    #     self,
    #     match_update: MatchSvCw2StUpdate,
    #     current_supervisor: Supervisor,
    #     session: AsyncSession,
    # ) -> MatchSvCw2St:
    #     pass


match_service = MatchService()
