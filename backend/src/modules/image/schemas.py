from pydantic import HttpUrl
from sqlmodel import SQLModel


class ImageSchema(SQLModel):
    url: HttpUrl
