from sqlalchemy import (
    Column,
    String,
    Table,
    UUID,
)

from adomains import Student

from badapters.orms import mapper_registry


StudentTable = Table(
    "student",
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
    class_=Student,
    local_table=StudentTable,
    properties={
        "_uuid": StudentTable.c.uuid,
        "_email": StudentTable.c.email,
        "_password": StudentTable.c.password,
    },
)
