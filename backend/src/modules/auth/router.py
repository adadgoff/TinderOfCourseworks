from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi_utils.cbv import cbv
from sqlmodel.ext.asyncio.session import AsyncSession

from src.core.deps import get_db
from src.shared.oauth2.form import TypedOAuth2PasswordRequestForm
from src.modules.auth.schemas import UserLogin, UserRead, UserRegister
from src.modules.auth.security import Token
from src.modules.auth.service import auth_service


router = APIRouter(tags=["Auth"])


@cbv(router)
class AuthRouter:
    session: AsyncSession = Depends(get_db)

    @router.post(path="/login/student")
    async def login_student(
        self,
        form_data: Annotated[TypedOAuth2PasswordRequestForm, Depends()],
    ) -> Token:
        student_login = UserLogin(
            email=form_data.username,
            password=form_data.password,
        )
        token = await auth_service.login_student(
            student_login=student_login,
            session=self.session,
        )
        return token

    @router.post(path="/register/student")
    async def register_student(
        self,
        student_register: UserRegister,
    ) -> UserRead:
        await auth_service.register_student(
            student_register=student_register,
            session=self.session,
        )
        user = UserRead(email=student_register.email, password="placeholder")
        return user

    @router.post(path="/login/supervisor")
    async def login_supervisor(
        self,
        form_data: Annotated[TypedOAuth2PasswordRequestForm, Depends()],
    ) -> Token:
        supervisor_login = UserLogin(
            email=form_data.username,
            password=form_data.password,
        )
        token = await auth_service.login_supervisor(
            supervisor_login=supervisor_login,
            session=self.session,
        )
        return token

    @router.post(path="/register/supervisor")
    async def register_supervisor(
        self,
        supervisor_register: UserRegister,
    ) -> UserRead:
        await auth_service.register_supervisor(
            supervisor_register=supervisor_register,
            session=self.session,
        )
        user = UserRead(email=supervisor_register.email, password="placeholder")
        return user
