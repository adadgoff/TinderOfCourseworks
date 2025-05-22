import { isLengthBetween } from "@/shared/lib/common";
import { UserBase } from "../user";
import { UserBaseProps } from "../user/types";
import {
  STUDENT_ICON_URL_DEFAULT,
  STUDENT_MAX_BIRTHDAY_DATE,
  STUDENT_MAX_CITY_LENGTH,
  STUDENT_MAX_CONTACT_LENGTH,
  STUDENT_MAX_DESCRIPTION_LENGTH,
  STUDENT_MAX_SKILLS_COUNT,
  STUDENT_MIN_BIRTHDAY_DATE,
  STUDENT_MIN_CITY_LENGTH,
  STUDENT_MIN_CONTACT_LENGTH,
  STUDENT_MIN_DESCRIPTION_LENGTH,
  STUDENT_MIN_SKILLS_COUNT,
} from "./consts";
import { StudentValidationError } from "./errors";
import { formatDateByLocale, isDateBetween } from "@/shared/lib/date";

interface StudentProps extends UserBaseProps {
  iconUrl?: string;
  lastOnline?: string;
  city: string;
  contact: string;
  birthday: string;
  description: string;
  skills: string[];
}

export class Student extends UserBase {
  public iconUrl: string;
  public lastOnline?: string;
  public city: string;
  public contact: string;
  public birthday: string;
  public description: string;
  public skills: string[];

  constructor({
    id,
    email,
    password,
    surname,
    name,
    patronymic,
    iconUrl = STUDENT_ICON_URL_DEFAULT,
    lastOnline,
    city,
    contact,
    birthday,
    description,
    skills,
  }: StudentProps) {
    super({ id, email, password, surname, name, patronymic });

    this.iconUrl = iconUrl;
    this.lastOnline = lastOnline;
    this.city = city;
    this.contact = contact;
    this.birthday = birthday;
    this.description = description;
    this.skills = skills;

    this.validateStudent();
  }

  private validateStudent() {
    const errors: string[] = [];

    errors.push(...this.validateBirthday());
    errors.push(...this.validateCity());
    errors.push(...this.validateContact());
    errors.push(...this.validateDescription());
    errors.push(...this.validateIconUrl());
    errors.push(...this.validateLastOnline());
    errors.push(...this.validateSkills());

    if (errors.length > 0) {
      throw new StudentValidationError(errors.join("; ") + ".");
    }
  }

  private validateBirthday(): string[] {
    const errors: string[] = [];

    if (
      !isDateBetween(
        this.birthday,
        STUDENT_MIN_BIRTHDAY_DATE,
        STUDENT_MAX_BIRTHDAY_DATE,
      )
    ) {
      errors
        .push
        // `Birthday must be between ${formatDateByLocale(
        //   STUDENT_MIN_BIRTHDAY_DATE,
        // )} and ${formatDateByLocale(STUDENT_MAX_BIRTHDAY_DATE)} dates`,
        ();
    }

    return errors;
  }

  private validateCity(): string[] {
    const errors: string[] = [];

    if (
      !isLengthBetween(
        this.city,
        STUDENT_MIN_CITY_LENGTH,
        STUDENT_MAX_CITY_LENGTH,
      )
    ) {
      errors.push(
        `City must be between ${STUDENT_MIN_CITY_LENGTH} and ${STUDENT_MAX_CITY_LENGTH} characters`,
      );
    }

    return errors;
  }

  private validateContact(): string[] {
    const errors: string[] = [];

    if (
      !isLengthBetween(
        this.contact,
        STUDENT_MIN_CONTACT_LENGTH,
        STUDENT_MAX_CONTACT_LENGTH,
      )
    ) {
      errors.push(
        `Contact must be between ${STUDENT_MIN_CONTACT_LENGTH} and ${STUDENT_MAX_CONTACT_LENGTH} characters`,
      );
    }

    return errors;
  }

  private validateDescription(): string[] {
    const errors: string[] = [];

    if (
      !isLengthBetween(
        this.description,
        STUDENT_MIN_DESCRIPTION_LENGTH,
        STUDENT_MAX_DESCRIPTION_LENGTH,
      )
    ) {
      errors.push(
        `Description must be between ${STUDENT_MIN_DESCRIPTION_LENGTH} and ${STUDENT_MAX_DESCRIPTION_LENGTH} characters`,
      );
    }

    return errors;
  }

  private validateIconUrl(): string[] {
    const errors: string[] = [];

    // TODO: implement.

    return errors;
  }

  private validateLastOnline(): string[] {
    const errors: string[] = [];

    // TODO: implement.

    return errors;
  }

  private validateSkills(): string[] {
    const errors: string[] = [];

    if (
      !isLengthBetween(
        this.skills,
        STUDENT_MIN_SKILLS_COUNT,
        STUDENT_MAX_SKILLS_COUNT,
      )
    ) {
      errors.push(
        `Skills must be between ${STUDENT_MIN_SKILLS_COUNT} and ${STUDENT_MAX_SKILLS_COUNT} elements`,
      );
    }

    return errors;
  }
}
