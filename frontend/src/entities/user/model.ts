import { isLengthBetween } from "@/shared/lib/common";
import { UserValidationError } from "./errors";
import {
  USER_MAX_EMAIL_LENGTH,
  USER_MAX_NAME_LENGTH,
  USER_MAX_PASSWORD_LENGTH,
  USER_MAX_PATRONYMIC_LENGTH,
  USER_MAX_SURNAME_LENGTH,
  USER_MIN_EMAIL_LENGTH,
  USER_MIN_NAME_LENGTH,
  USER_MIN_PASSWORD_LENGTH,
  USER_MIN_PATRONYMIC_LENGTH,
  USER_MIN_SURNAME_LENGTH,
} from "./consts";
import { UserBaseProps } from "./types";

export class UserBase {
  public id: string;
  public email: string;
  public password: string;
  public surname: string;
  public name: string;
  public patronymic: string;

  constructor({
    id,
    email,
    password,
    surname,
    name,
    patronymic,
  }: UserBaseProps) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.surname = surname;
    this.name = name;
    this.patronymic = patronymic;

    this.validate();
  }

  private validate() {
    const errors: string[] = [];

    errors.push(...this.validateEmail());
    errors.push(...this.validateName());
    errors.push(...this.validatePassword());
    errors.push(...this.validatePatronymic());
    errors.push(...this.validateSurname());

    if (errors.length > 0) {
      throw new UserValidationError(errors.join("; ") + ".");
    }
  }

  private validateEmail(): string[] {
    const errors: string[] = [];

    // TODO: implement better validation.

    if (
      !isLengthBetween(this.email, USER_MIN_EMAIL_LENGTH, USER_MAX_EMAIL_LENGTH)
    ) {
      errors.push(
        `Email must be between ${USER_MIN_EMAIL_LENGTH} and ${USER_MAX_EMAIL_LENGTH} characters`,
      );
    }

    return errors;
  }

  private validateName(): string[] {
    const errors: string[] = [];

    // TODO: implement better validation.

    if (
      !isLengthBetween(this.name, USER_MIN_NAME_LENGTH, USER_MAX_NAME_LENGTH)
    ) {
      errors.push(
        `Name must be between ${USER_MIN_NAME_LENGTH} and ${USER_MAX_NAME_LENGTH} characters`,
      );
    }

    return errors;
  }

  private validatePassword(): string[] {
    const errors: string[] = [];

    // TODO: implement better validation.

    if (
      !isLengthBetween(
        this.password,
        USER_MIN_PASSWORD_LENGTH,
        USER_MAX_PASSWORD_LENGTH,
      )
    ) {
      errors.push(
        `Password must be between ${USER_MIN_PASSWORD_LENGTH} and ${USER_MAX_PASSWORD_LENGTH} characters`,
      );
    }

    return errors;
  }

  private validatePatronymic(): string[] {
    const errors: string[] = [];

    // TODO: implement better validation.

    if (
      !isLengthBetween(
        this.patronymic,
        USER_MIN_PATRONYMIC_LENGTH,
        USER_MAX_PATRONYMIC_LENGTH,
      )
    ) {
      errors.push(
        `Patronymic must be between ${USER_MIN_PATRONYMIC_LENGTH} and ${USER_MAX_PATRONYMIC_LENGTH} characters`,
      );
    }

    return errors;
  }

  private validateSurname(): string[] {
    const errors: string[] = [];

    // TODO: implement better validation.

    if (
      !isLengthBetween(
        this.surname,
        USER_MIN_SURNAME_LENGTH,
        USER_MAX_SURNAME_LENGTH,
      )
    ) {
      errors.push(
        `Surname must be between ${USER_MIN_SURNAME_LENGTH} and ${USER_MAX_SURNAME_LENGTH} characters`,
      );
    }

    return errors;
  }
}
