from domains import (
    Student,
)
from domains.core import (
    Request,
    Response,
)


if __name__ == "__main__":
    import uuid
    s = Student(
        uuid=uuid.uuid4(),
        email="valid@valid.valid",
        password="123",
    )
    print(s)
    print(s.password)


    try:
        req = Request()
        print(req)

        res = Response(
            status=None,
            body=None,
        )
        print(res)
    except Exception:
        print("все ок")
