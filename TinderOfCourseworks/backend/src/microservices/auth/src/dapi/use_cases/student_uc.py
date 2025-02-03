from abc import (
    ABC,
    abstractmethod,
)

from adomains.requests import (
    CreateStudentRequest,
    DeleteStudentRequest,
    UpdateStudentEmailRequest,
    UpdateStudentPasswordRequest,
    VerifyStudentRequest,
)
from adomains.responses import (
    CreateStudentResponse,
    DeleteStudentResponse,
    UpdateStudentResponse,
    VerifyStudentResponse,
)


class StudentUseCases(ABC):
    @abstractmethod
    async def create_student(
        self,
        request: CreateStudentRequest,
    ) -> CreateStudentResponse:
        pass

    @abstractmethod
    async def update_student_email(
        self,
        request: UpdateStudentEmailRequest,
    ) -> UpdateStudentResponse:
        pass

    @abstractmethod
    async def update_student_password(
        self,
        request: UpdateStudentPasswordRequest,
    ) -> UpdateStudentResponse:
        pass

    @abstractmethod
    async def delete_student(
        self,
        request: DeleteStudentRequest,
    ) -> DeleteStudentResponse:
        pass

    @abstractmethod
    async def verify_student(
        self,
        request: VerifyStudentRequest,
    ) -> VerifyStudentResponse:
        pass
