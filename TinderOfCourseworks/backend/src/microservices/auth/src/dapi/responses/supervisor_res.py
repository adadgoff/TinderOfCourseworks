from uuid import UUID

from adomains.core import (
    ForbidInstance,
    Response,
)
from adomains.exceptions import (
    SupervisorResponseInstanceForbiddenException,
)


@ForbidInstance(
    cls_exception=SupervisorResponseInstanceForbiddenException,
)
class SupervisorResponse(Response):
    pass


class CreateSupervisorResponse(SupervisorResponse):
    uuid: UUID


class UpdateSupervisorResponse(SupervisorResponse):
    uuid: UUID


class DeleteSupervisorResponse(SupervisorResponse):
    uuid: UUID


class VerifySupervisorResponse(SupervisorResponse):
    result: bool
