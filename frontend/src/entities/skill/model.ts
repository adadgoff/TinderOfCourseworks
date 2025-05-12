import { isLengthBetween } from "@/shared/lib/common";
import { SKILL_MIN_NAME_LENGTH, SKILL_MAX_NAME_LENGTH } from "./consts";
import { TagValidationError } from "./errors";

interface SkillProps {
  id?: string; // if creating new skill.
  name: string;
}

export class Skill {
  public id?: string;
  public name: string;

  constructor({ id, name }: SkillProps) {
    this.id = id;
    this.name = name;

    this.validate();
  }

  private validate(): void {
    const errors: string[] = [];

    errors.push(...this.validateName());

    if (errors.length > 0) {
      throw new TagValidationError(errors.join("; ") + ".");
    }
  }

  private validateName(): string[] {
    const errors: string[] = [];

    if (
      !isLengthBetween(this.name, SKILL_MIN_NAME_LENGTH, SKILL_MAX_NAME_LENGTH)
    ) {
      errors.push(
        `Name must be between ${SKILL_MIN_NAME_LENGTH} and ${SKILL_MAX_NAME_LENGTH} characters`,
      );
    }

    return errors;
  }
}
