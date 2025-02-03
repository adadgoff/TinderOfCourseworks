from pydantic import (
    BaseModel,

)


class CommandRepository(BaseModel):
    __student_command_repository: StudentCommandRepository
    __supervisor_command_repository: SupervisorCommandRepository

    async def create_student(self) -> ...:
        return await self.__student_command_repository.create(

        )
    
    async def read_student(self) -> ...:
        return await self.__student_command_repository.read(

        )
    
    async def update_student(self) -> ...:
        return await self.__student_command_repository.update(

        )
    
    async def delete_student(self) -> ...:
        return await self.__student_command_repository.delete(

        )

    async def create_supervisor(self) -> ...:
        return await self.__supervisor_command_repository.create(

        )

    async def read_supervisor(self) -> ...:
        return await self.__supervisor_command_repository.read(

        )
    
    async def update_supervisor(self) -> ...:
        return await self.__supervisor_command_repository.update(
            
        )