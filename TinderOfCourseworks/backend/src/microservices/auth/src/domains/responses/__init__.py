from messages.responses.student_res import (
    CreateStudentResponse,
    DeleteStudentResponse,
    UpdateStudentResponse,
    VerifyStudentResponse,
)
from messages.responses.supervisor_res import (
    CreateSupervisorResponse,
    DeleteSupervisorResponse,
    UpdateSupervisorResponse,
    VerifySupervisorResponse,
)


__all__ = (
    # Student Domain.
    "CreateStudentResponse",
    "UpdateStudentResponse",
    "DeleteStudentResponse",
    "VerifyStudentResponse",

    # Supervisor Domain.
    "CreateSupervisorResponse",
    "DeleteSupervisorResponse",
    "UpdateSupervisorResponse",
    "VerifySupervisorResponse",
)
