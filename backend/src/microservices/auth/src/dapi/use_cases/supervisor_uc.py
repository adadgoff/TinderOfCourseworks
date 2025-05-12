from abc import (
    ABC,
    abstractmethod,
)

from adomains.requests import (
    CreateSupervisorRequest,
    DeleteSupervisorRequest,
    UpdateSupervisorEmailRequest,
    UpdateSupervisorPasswordRequest,
    VerifySupervisorRequest,
)
from adomains.responses import (
    CreateSupervisorResponse,
    DeleteSupervisorResponse,
    UpdateSupervisorResponse,
    VerifySupervisorResponse,
)


class SupervisorUseCases(ABC):
    @abstractmethod
    async def create_supervisor(
        self,
        request: CreateSupervisorRequest,
    ) -> CreateSupervisorResponse:
        pass

    @abstractmethod
    async def update_supervisor_email(
        self,
        request: UpdateSupervisorEmailRequest,
    ) -> UpdateSupervisorResponse:
        pass

    @abstractmethod
    async def update_supervisor_password(
        self,
        request: UpdateSupervisorPasswordRequest,
    ) -> UpdateSupervisorResponse:
        pass

    @abstractmethod
    async def delete_supervisor(
        self,
        request: DeleteSupervisorRequest,
    ) -> DeleteSupervisorResponse:
        pass

    @abstractmethod
    async def verify_supervisor(
        self,
        request: VerifySupervisorRequest,
    ) -> VerifySupervisorResponse:
        pass
