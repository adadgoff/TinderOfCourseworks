import jwt
from jwt.exceptions import InvalidTokenError
from fastapi import HTTPException, status
from pydantic import ValidationError

from src.core.security import TokenPayload
from src.core.deps import SessionDep, TokenDep
from src.core.config import settings
from src.modules.common.security.consts import ALGORITHM
from src.modules.supervisor.entities import Supervisor


async def get_current_supervisor(
    session: SessionDep,
    token: TokenDep,
) -> Supervisor:
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

    supervisor = await session.get(
        entity=Supervisor,
        ident=token_data.sub,
    )
    if not supervisor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Supervisor not found",
        )

    return supervisor
