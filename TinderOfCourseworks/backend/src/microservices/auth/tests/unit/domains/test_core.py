# from domains import (
#     Student,
#     StudentUseCases,
# )
# from domains.core import (
#     Request,
#     Response,
#     Status,
# )
# from domains.responses import (
#     CreateStudentResponse,
# )


# if __name__ == "__main__":
#     import uuid
#     s = Student(
#         uuid=uuid.uuid4(),
#         email="valid@valid.valid",
#         password="123",
#     )
#     print(s)
#     print(s.password)

#     try:
#         req = Request()
#         print(req)
#     except Exception:
#         print("Request: все ок")

#     try: 
#         res = Response(
#             status=None,
#             body=None,
#         )
#         print(res)
#     except Exception:
#         print("Response: все ок")

#     csr = CreateStudentResponse(
#         status=Status.OK,
#         message="",
#         uuid=uuid.uuid4(),
#     )
#     print(csr)
