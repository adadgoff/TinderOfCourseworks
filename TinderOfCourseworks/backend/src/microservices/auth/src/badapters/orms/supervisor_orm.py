from sqlalchemy import (
    Column,
    String,
    Table,
    UUID,
)

from adomains import Supervisor

from badapters.orms import mapper_registry


SupervisorTable = Table(
    "supervisor",
    mapper_registry.metadata,
    Column(
        name="uuid",
        primary_key=True,
        type_=UUID,
    ),
    Column(
        name="email",
        nullable=False,
        type_=String(length=254),
        unique=True,
    ),
    Column(
        name="password",
        nullable=False,
        type_=String(length=60),
    ),
)


mapper_registry.map_imperatively(
    class_=Supervisor,
    local_table=SupervisorTable,
    properties={
        "_uuid": SupervisorTable.c.uuid,
        "_email": SupervisorTable.c.email,
        "_password": SupervisorTable.c.password,
    },
)
