from fastapi import APIRouter, Depends, UploadFile
from fastapi_utils.cbv import cbv

from src.modules.image.files import file_manager
from src.modules.image.schemas import ImageSchema
from src.modules.student.deps import get_current_student
from src.modules.supervisor.deps import get_current_supervisor


router = APIRouter(tags=["Image"])


# TODO: implement deleting unused files.


@cbv(router)
class ImageRouter:
    @router.post(
        path="/student/avatar/upload",
        dependencies=[Depends(get_current_student)],
    )
    async def upload_student_avatar(
        self,
        file: UploadFile,
    ) -> ImageSchema:
        filepath = file_manager.save_file(
            file=file,
            folder_path="student/avatars",
        )
        image_ulr = file_manager.build_image_url(relative_filepath=filepath)
        return ImageSchema(url=image_ulr)

    @router.post(
        path="/student/courseworks/icon/upload",
        dependencies=[Depends(get_current_student)],
    )
    async def upload_student_coursework_icon(
        self,
        file: UploadFile,
    ) -> ImageSchema:
        filepath = file_manager.save_file(
            file=file,
            folder_path="student/icons",
        )
        image_ulr = file_manager.build_image_url(relative_filepath=filepath)
        return ImageSchema(url=image_ulr)

    @router.post(
        path="/supervisor/avatar/upload",
        dependencies=[Depends(get_current_supervisor)],
    )
    async def upload_supervisor_avatar(
        self,
        file: UploadFile,
    ) -> ImageSchema:
        filepath = file_manager.save_file(
            file=file,
            folder_path="supervisor/avatars",
        )
        image_ulr = file_manager.build_image_url(relative_filepath=filepath)
        return ImageSchema(url=image_ulr)

    @router.post(
        path="/supervisor/coursework/icon/upload",
        dependencies=[Depends(get_current_supervisor)],
    )
    async def upload_supervisor_coursework_icon(
        self,
        file: UploadFile,
    ) -> ImageSchema:
        filepath = file_manager.save_file(
            file=file,
            folder_path="supervisor/icons",
        )
        image_ulr = file_manager.build_image_url(relative_filepath=filepath)
        return ImageSchema(url=image_ulr)
