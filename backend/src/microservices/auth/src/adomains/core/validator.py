from string import (
    ascii_letters,
    digits,
)

from email_validator import validate_email


ALLOWED_PASSWORD_CHARS = (
    ascii_letters +
    digits +
    r"()[]{}<>"
    r"!?;:,."
    r"+-*/"
    r"@#$%^&_~"
)


class Validator:
    @staticmethod
    def get_validated_email(
        *,
        email: str,
    ) -> str:
        if not isinstance(email, str):
            raise TypeError  # TODO: implement exception.
        email = email.strip()
        return validate_email(email).normalized

    @staticmethod
    def get_validated_password(
        *,
        password: str,
    ) -> str:
        if not isinstance(password, str):
            raise TypeError  # TODO: implement exception.
        password = password.strip()
        if not (8 <= len(password) <= 255):
            raise ValueError  # TODO: implement exception.
        if not all(
            char in ALLOWED_PASSWORD_CHARS
            for char in password
        ):
            raise ValueError  # TODO: implement exception.
        return password
