from typing import Union, Annotated

from fastapi.param_functions import Form
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import EmailStr


class TypedOAuth2PasswordRequestForm(OAuth2PasswordRequestForm):
    def __init__(
        self,
        *,
        grant_type: Annotated[Union[str, None], Form(pattern="^password$")] = None,
        username: Annotated[EmailStr, Form()],
        password: Annotated[str, Form()],
        scope: Annotated[str, Form()] = "",
        client_id: Annotated[Union[str, None], Form()] = None,
        client_secret: Annotated[Union[str, None], Form()] = None,
    ):
        super().__init__(
            grant_type=grant_type,
            username=username,
            password=password,
            scope=scope,
            client_id=client_id,
            client_secret=client_secret,
        )
