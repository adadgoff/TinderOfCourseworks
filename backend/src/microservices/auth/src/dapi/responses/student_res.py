from uuid import UUID

from adomains.core import (
    ForbidInstance,
    Response,
)
from adomains.exceptions import (
    StudentResponseInstanceForbiddenException,
)


@ForbidInstance(
    cls_exception=StudentResponseInstanceForbiddenException,
)
class StudentResponse(Response):
    pass


class CreateStudentResponse(StudentResponse):
    uuid: UUID


class UpdateStudentResponse(StudentResponse):
    uuid: UUID


class DeleteStudentResponse(StudentResponse):
    uuid: UUID


class VerifyStudentResponse(StudentResponse):
    result: bool
