from messages.requests.student_req import (
    CreateStudentRequest,
    DeleteStudentRequest,
    UpdateStudentEmailRequest,
    UpdateStudentPasswordRequest,
    VerifyStudentRequest,
)
from messages.requests.supervisor_req import (
    CreateSupervisorRequest,
    DeleteSupervisorRequest,
    UpdateSupervisorEmailRequest,
    UpdateSupervisorPasswordRequest,
    VerifySupervisorRequest,
)


__all__ = (
    # Student Domain.
    "CreateStudentRequest",
    "UpdateStudentEmailRequest",
    "UpdateStudentPasswordRequest",
    "DeleteStudentRequest",
    "VerifyStudentRequest",

    # Supervisor Domain.
    "CreateSupervisorRequest",
    "UpdateSupervisorEmailRequest",
    "UpdateSupervisorPasswordRequest",
    "DeleteSupervisorRequest",
    "VerifySupervisorRequest",
)
