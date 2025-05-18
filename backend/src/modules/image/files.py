import os
from urllib.parse import urljoin
from uuid import uuid4

from fastapi import HTTPException, UploadFile, status

from src.core.config import settings
from src.modules.image.consts import (
    ALLOWED_EXTENSIONS,
    ALLOWED_MIME_TYPES,
    STATIC_PATH,
)


class FileManager:
    def build_image_url(self, relative_filepath: str) -> str:
        absolute_path = os.path.join(
            STATIC_PATH,
            relative_filepath,
        ).replace(os.sep, "/")
        image_url = urljoin(base=settings.BACKEND_HOST, url=absolute_path)
        return image_url

    def is_allowed_file_extension(
        self,
        file: UploadFile,
    ) -> bool:
        *_, extension = file.filename.split(".")
        return extension.lower() in ALLOWED_EXTENSIONS

    def is_allowed_mime_type(
        self,
        file: UploadFile,
    ) -> bool:
        return file.content_type in ALLOWED_MIME_TYPES

    def get_unique_filename(
        self,
        filename: str,
    ) -> str:
        *_, extension = filename.split(".")
        return f"{uuid4().hex}.{extension}"

    def save_file(
        self,
        file: UploadFile,
        folder_path: str,
    ) -> str:
        if self.is_allowed_file_extension(file=file) is False:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid file extension. Allowed: {ALLOWED_EXTENSIONS}",
            )

        if self.is_allowed_mime_type(file=file) is False:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid MIME type. Allowed: {ALLOWED_MIME_TYPES}",
            )

        relative_filepath = os.path.join(
            folder_path,
            self.get_unique_filename(filename=file.filename),
        )
        absolute_filepath = os.path.join(STATIC_PATH, relative_filepath)

        with open(file=absolute_filepath, mode="wb") as f:
            f.write(file.file.read())

        return relative_filepath


file_manager = FileManager()
