import functools

from typing import (
    Any,
    Type,
    TypeVar,
)


T = TypeVar(name="T")


class ForbidInstance:
    def __init__(
            self,
            cls_exception: Type[Exception],
    ) -> None:
        self.cls_exception = cls_exception

    def __call__(
            self,
            cls: T,
    ) -> T:
        origin_new = cls.__new__

        @functools.wraps(wrapped=origin_new)
        def updated_new(
            cls_: T,
            *args: tuple[Any],
            **kwds: dict[str, Any],
        ) -> T:
            if cls_ is cls:
                raise self.cls_exception
            return origin_new(cls_)

        cls.__new__ = updated_new
        return cls
