import { Skill } from "./model";

export function compareSkills(leftSkill: Skill, rightSkill: Skill): number {
  return leftSkill.name.localeCompare(rightSkill.name);
}
