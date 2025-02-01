from uuid import UUID

from pydantic import EmailStr

from domains.core import Request


class SupervisorRequest(Request):
    pass


class CreateSupervisorRequest(SupervisorRequest):
    uuid: UUID
    email: EmailStr
    password: str


class UpdateSupervisorEmailRequest(SupervisorRequest):
    uuid: UUID
    email: EmailStr


class UpdateSupervisorPasswordRequest(SupervisorRequest):
    uuid: UUID
    password: str


class DeleteSupervisorRequest(SupervisorRequest):
    uuid: UUID


class VerifySupervisorRequest(SupervisorRequest):
    email: EmailStr
    password: str
