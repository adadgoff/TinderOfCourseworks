from uuid import UUID

from messages.response import Response


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
