from abc import ABC
from typing import (
    Any,
    Self,
)
from uuid import UUID

from domains.core import (
    Response,
    ResponseBody,
)


class CreateStudentResponse(StudentResponse):
    uuid: UUID


class UpdateStudentResponse(StudentResponse):
    uuid: UUID


class DeleteStudentResponse(StudentResponse):
    uuid: UUID


class VerifyStudentResponse(StudentResponse):
    result: bool
