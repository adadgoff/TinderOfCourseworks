from pydantic import EmailStr
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select

from src.modules.auth.schemas import UserRegister
from src.modules.auth.entities import AuthStudent, AuthSupervisor


class AuthRepository:
    async def create_student(
        self,
        student_create: UserRegister,
        session: AsyncSession,
    ) -> AuthStudent:
        student = AuthStudent(
            email=student_create.email,
            password=student_create.password,
        )
        session.add(student)
        await session.commit()
        await session.refresh(student)
        return student

    async def read_student_by_email(
        self,
        email: EmailStr,
        session: AsyncSession,
    ) -> AuthStudent | None:
        statement = select(AuthStudent).where(AuthStudent.email == email)
        student = (await session.exec(statement)).first()
        return student

    async def create_supervisor(
        self,
        supervisor_create: UserRegister,
        session: AsyncSession,
    ) -> AuthSupervisor:
        supervisor = AuthSupervisor(
            email=supervisor_create.email,
            password=supervisor_create.password,
        )
        session.add(supervisor)
        await session.commit()
        await session.refresh(supervisor)
        return supervisor

    async def read_supervisor_by_email(
        self,
        email: EmailStr,
        session: AsyncSession,
    ) -> AuthSupervisor | None:
        statement = select(AuthSupervisor).where(AuthSupervisor.email == email)
        supervisor = (await session.exec(statement)).first()
        return supervisor


auth_repository = AuthRepository()
