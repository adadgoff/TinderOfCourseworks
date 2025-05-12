import { isLengthBetween } from "@/shared/lib/common";
import { Skill } from "../skill";
import { CourseworkValidationError } from "./errors";
import {
  COURSEWORK_MAX_DESCRIPTION_LENGTH,
  COURSEWORK_MAX_SKILLS_COUNT,
  COURSEWORK_MAX_TITLE_LENGTH,
  COURSEWORK_MIN_DESCRIPTION_LENGTH,
  COURSEWORK_MIN_SKILLS_COUNT,
  COURSEWORK_MIN_TITLE_LENGTH,
  COURSEWORK_ICON_URL_DEFAULT,
} from "./consts";
import { CourseworkStatus } from "./types";

interface CourseworkProps {
  id?: string; // if creating new coursework.
  title: string;
  iconUrl?: string;
  description: string;
  lastChange?: Date;
  status?: CourseworkStatus;
  skills: Skill[];
}

export class Coursework {
  public id?: string;
  public title: string;
  public iconUrl: string;
  public description: string;
  public lastChange: Date;
  public status: CourseworkStatus;
  public skills: Skill[];

  constructor({
    id,
    title,
    iconUrl = COURSEWORK_ICON_URL_DEFAULT,
    description,
    lastChange = new Date(),
    status = CourseworkStatus.Matching,
    skills,
  }: CourseworkProps) {
    this.id = id;
    this.title = title;
    this.iconUrl = iconUrl;
    this.description = description;
    this.lastChange = lastChange;
    this.status = status;
    this.skills = skills;

    this.validate();
  }

  private validate() {
    const errors: string[] = [];

    errors.push(...this.validateDescription());
    errors.push(...this.validateIconUrl());
    errors.push(...this.validateSkills());
    errors.push(...this.validateTitle());

    if (errors.length > 0) {
      throw new CourseworkValidationError(errors.join("; ") + ".");
    }
  }

  private validateDescription(): string[] {
    const errors: string[] = [];

    if (
      !isLengthBetween(
        this.description,
        COURSEWORK_MIN_DESCRIPTION_LENGTH,
        COURSEWORK_MAX_DESCRIPTION_LENGTH,
      )
    ) {
      errors.push(
        `Description must be between ${COURSEWORK_MIN_DESCRIPTION_LENGTH} and ${COURSEWORK_MAX_DESCRIPTION_LENGTH} characters`,
      );
    }

    return errors;
  }

  private validateIconUrl(): string[] {
    const errors: string[] = [];

    // TODO: implement.

    return errors;
  }

  private validateSkills(): string[] {
    const errors: string[] = [];

    if (
      !isLengthBetween(
        this.skills,
        COURSEWORK_MIN_SKILLS_COUNT,
        COURSEWORK_MAX_SKILLS_COUNT,
      )
    ) {
      errors.push(
        `Skills must be between ${COURSEWORK_MIN_SKILLS_COUNT} and ${COURSEWORK_MAX_SKILLS_COUNT} elements`,
      );
    }

    return errors;
  }

  private validateTitle(): string[] {
    const errors: string[] = [];

    if (
      !isLengthBetween(
        this.title,
        COURSEWORK_MIN_TITLE_LENGTH,
        COURSEWORK_MAX_TITLE_LENGTH,
      )
    ) {
      errors.push(
        `Title must be between ${COURSEWORK_MIN_TITLE_LENGTH} and ${COURSEWORK_MAX_TITLE_LENGTH} characters`,
      );
    }

    return errors;
  }
}
