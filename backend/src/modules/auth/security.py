from datetime import datetime, timedelta, timezone
from typing import Any

import jwt

from sqlmodel import SQLModel
from passlib.context import CryptContext

from src.modules.common.security.consts import ALGORITHM
from src.core.config import settings


pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(secret=plain_password, hash=hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(secret=password)


def create_access_token(subject: str | Any, expires_delta: timedelta) -> str:
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(
        payload=to_encode,
        key=settings.SECRET_KEY,
        algorithm=ALGORITHM,
    )
    return encoded_jwt


class Token(SQLModel):
    access_token: str
