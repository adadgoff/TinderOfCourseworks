from typing import Annotated, Any, Literal, Self
import warnings

from pydantic import (
    AnyUrl,
    BeforeValidator,
    computed_field,
    model_validator,
    PostgresDsn,
)
from pydantic_core import MultiHostUrl
from pydantic_settings import (
    BaseSettings,
    SettingsConfigDict,
)


def parse_cors(v: Any) -> list[str] | str:
    if isinstance(v, str) and not v.startswith("["):
        return [i.strip() for i in v.split(",")]
    elif isinstance(v, list | str):
        return v
    raise ValueError(v)


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file="../.env",
        env_ignore_empty=True,
        extra="ignore",
    )

    ENVIRONMENT: Literal["local", "staging", "production"] = "local"
    PROJECT_NAME: str

    # Frontend.

    FRONTEND_HOST: str

    # Backend.

    BACKEND_HOST: str

    API_V1_STR: str = "/api/v1"
    # 60 minutes * 24 hours * 8 days = 8 days.
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    BACKEND_CORS_ORIGINS: Annotated[
        list[AnyUrl] | str, BeforeValidator(parse_cors)
    ] = []
    SECRET_KEY: str

    POSTGRES_DB: str
    POSTGRES_PASSWORD: str
    POSTGRES_PORT: int
    POSTGRES_SERVER: str
    POSTGRES_USER: str

    @computed_field
    @property
    def all_cors_origins(self) -> list[str]:
        return [str(origin).rstrip("/") for origin in self.BACKEND_CORS_ORIGINS] + [
            self.FRONTEND_HOST
        ]

    @computed_field
    @property
    def SQLALCHEMY_DATABASE_URI(self) -> PostgresDsn:
        return MultiHostUrl.build(
            scheme="postgresql+asyncpg",
            host=self.POSTGRES_SERVER,
            path=self.POSTGRES_DB,
            password=self.POSTGRES_PASSWORD,
            port=self.POSTGRES_PORT,
            username=self.POSTGRES_USER,
        )

    def _check_default_secrets(self, var_name: str, value: str | None) -> None:
        if value == "changethis":
            message = (
                f'The value of {var_name} is "changethis", '
                "for security, please change it, at least for deployments."
            )
            if self.ENVIRONMENT == "local":
                warnings.warn(message=message, stacklevel=1)
            else:
                raise ValueError(message)

    @model_validator(mode="after")
    def _enforce_non_default_secrets(self) -> Self:
        self._check_default_secrets("SECRET_KEY", self.SECRET_KEY)
        self._check_default_secrets("POSTGRES_PASSWORD", self.POSTGRES_PASSWORD)
        return self


settings = Settings()
