import jwt
from jwt.exceptions import InvalidTokenError
from fastapi import HTTPException, status
from pydantic import ValidationError

from src.core.security import TokenPayload
from src.core.deps import SessionDep, TokenDep
from src.core.config import settings
from src.modules.common.security.consts import ALGORITHM
from src.modules.student.entities import Student


async def get_current_student(
    session: SessionDep,
    token: TokenDep,
) -> Student:
    try:
        payload = jwt.decode(
            jwt=token,
            key=settings.SECRET_KEY,
            algorithms=[ALGORITHM],
        )
        token_data = TokenPayload(**payload)
    except (InvalidTokenError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )

    student = await session.get(
        entity=Student,
        ident=token_data.sub,
    )
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found",
        )

    return student
