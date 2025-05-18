from datetime import timedelta

from fastapi import HTTPException, status
from sqlmodel.ext.asyncio.session import AsyncSession

from src.modules.auth.entities import AuthStudent, AuthSupervisor
from src.core.config import settings
from src.modules.auth.schemas import UserLogin, UserRegister
from src.modules.auth.security import (
    Token,
    create_access_token,
    get_password_hash,
    verify_password,
)
from src.modules.auth.repository import auth_repository
from src.modules.student.service import student_service
from src.modules.student.schemas import StudentCreate
from src.modules.supervisor.service import supervisor_service
from src.modules.supervisor.schemas import SupervisorCreate
from src.modules.recommender_system.entities.st import St
from src.modules.recommender_system.entities.sv import Sv
from src.modules.recommender_system.services.st import st_service
from src.modules.recommender_system.services.sv import sv_service


class AuthService:
    async def login_student(
        self,
        student_login: UserLogin,
        session: AsyncSession,
    ) -> Token:
        student = await auth_repository.read_student_by_email(
            email=student_login.email,
            session=session,
        )
        if (
            student is None
            or verify_password(
                plain_password=student_login.password,
                hashed_password=student.password,
            )
            is False
        ):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Incorrect credentials",
            )
        token = create_access_token(
            subject=student.id,
            expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
        )
        return Token(access_token=token)

    async def register_student(
        self,
        student_register: UserRegister,
        session: AsyncSession,
    ) -> AuthStudent:
        student = await auth_repository.read_student_by_email(
            email=student_register.email,
            session=session,
        )
        if student is not None:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Student already exists",
            )

        hashed_password = get_password_hash(password=student_register.password)
        student_register.password = hashed_password

        student = await auth_repository.create_student(
            student_create=student_register,
            session=session,
        )

        await st_service.create_st(
            st_create=St(**student.model_dump()),
            session=session,
        )
        await session.refresh(student)
        await student_service.create_student(
            student_create=StudentCreate(**student.model_dump()),
            session=session,
        )

        return student

    async def login_supervisor(
        self,
        supervisor_login: UserLogin,
        session: AsyncSession,
    ) -> Token:
        supervisor = await auth_repository.read_supervisor_by_email(
            email=supervisor_login.email,
            session=session,
        )
        if (
            supervisor is None
            or verify_password(
                plain_password=supervisor_login.password,
                hashed_password=supervisor.password,
            )
            is False
        ):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Incorrect credentials",
            )
        token = create_access_token(
            subject=supervisor.id,
            expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
        )
        return Token(access_token=token)

    async def register_supervisor(
        self,
        supervisor_register: UserRegister,
        session: AsyncSession,
    ) -> AuthSupervisor:
        supervisor = await auth_repository.read_supervisor_by_email(
            email=supervisor_register.email,
            session=session,
        )
        if supervisor is not None:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Supervisor already exists",
            )

        hashed_password = get_password_hash(password=supervisor_register.password)
        supervisor_register.password = hashed_password

        supervisor = await auth_repository.create_supervisor(
            supervisor_create=supervisor_register,
            session=session,
        )

        await sv_service.create_sv(
            sv_create=Sv(**supervisor.model_dump()),
            session=session,
        )
        await session.refresh(supervisor)
        await supervisor_service.create_supervisor(
            supervisor_create=SupervisorCreate(**supervisor.model_dump()),
            session=session,
        )

        return supervisor


auth_service = AuthService()
