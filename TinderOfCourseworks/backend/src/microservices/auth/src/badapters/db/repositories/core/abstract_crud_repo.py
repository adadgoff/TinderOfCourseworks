from abc import (
    ABC,
    abstractmethod,
)
from typing import TypeVar

from pydantic import (
    BaseModel,
    ConfigDict,
)

from adomains.core import Domain


DomainOrm = TypeVar(
    name="DomainORM",
    bound=Domain,
)


class AbstractCrudRepository(
    ABC,
    BaseModel,
):
    model_config = ConfigDict(
        extra="forbid",
        frozen=True,
        strict=True,
        validate_default=True,
        validate_return=True,
    )

    @abstractmethod
    async def create(
        self,
        model: Domain,
    ) -> DomainOrm:
        pass

    @abstractmethod
    async def read(
        self,
        model: Domain,
    ) -> DomainOrm:
        pass

    @abstractmethod
    async def update(
        self,
        model: Domain,
    ) -> DomainOrm:
        pass

    @abstractmethod
    async def delete(
        self,
        model: Domain,
    ) -> DomainOrm:
        pass
