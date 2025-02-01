from uuid import UUID

from pydantic import EmailStr

from domains.core import Request


class StudentRequest(Request):
    pass


class CreateStudentRequest(StudentRequest):
    uuid: UUID
    email: EmailStr
    password: str


class UpdateStudentEmailRequest(StudentRequest):
    uuid: UUID
    email: EmailStr


class UpdateStudentPasswordRequest(StudentRequest):
    uuid: UUID
    password: str


class DeleteStudentRequest(StudentRequest):
    uuid: UUID


class VerifyStudentRequest(StudentRequest):
    email: EmailStr
    password: str
