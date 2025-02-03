from adomains import Student


class StudentRepository(CrudRepository):
    async def create(
            self,
            model: Student,
    ) -> StudentOrm:
        result = await ...
        return result
    
    async def read(
            self,
            model: Student,
    ) -> StudentOrm:
        result = await ...
        return result
    
    async def update(
            self,
            model: Student
    ) -> StudentOrm:
        result = await ...
        return result

    async def delete(
            self,
            model: Student
    ) -> StudentOrm:
        result = await ...
        return result


student_repository = StudentRepository()
