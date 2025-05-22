import {
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
} from "@/entities/student/consts";
import {
  SUPERVISOR_MAX_BIRTHDAY_DATE,
  SUPERVISOR_MAX_CITY_LENGTH,
  SUPERVISOR_MAX_CONTACT_LENGTH,
  SUPERVISOR_MAX_DESCRIPTION_LENGTH,
  SUPERVISOR_MAX_SKILLS_COUNT,
  SUPERVISOR_MIN_BIRTHDAY_DATE,
  SUPERVISOR_MIN_CITY_LENGTH,
  SUPERVISOR_MIN_CONTACT_LENGTH,
  SUPERVISOR_MIN_DESCRIPTION_LENGTH,
  SUPERVISOR_MIN_SKILLS_COUNT,
} from "@/entities/supervisor/consts";
import { UserRole } from "@/entities/user/types";

interface MaxMinConfigProps {
  maxBirthdayDate: string;
  maxCityLength: number;
  maxContactLength: number;
  maxDescriptionLength: number;
  maxSkillsCount: number;

  minBirthdayDate: string;
  minCityLength: number;
  minContactLength: number;
  minDescriptionLength: number;
  minSkillsCount: number;
}

export const MaxMinConfig: Record<UserRole, MaxMinConfigProps> = {
  [UserRole.Student]: {
    maxBirthdayDate: STUDENT_MAX_BIRTHDAY_DATE,
    maxCityLength: STUDENT_MAX_CITY_LENGTH,
    maxContactLength: STUDENT_MAX_CONTACT_LENGTH,
    maxDescriptionLength: STUDENT_MAX_DESCRIPTION_LENGTH,
    maxSkillsCount: STUDENT_MAX_SKILLS_COUNT,

    minBirthdayDate: STUDENT_MIN_BIRTHDAY_DATE,
    minCityLength: STUDENT_MIN_CITY_LENGTH,
    minContactLength: STUDENT_MIN_CONTACT_LENGTH,
    minDescriptionLength: STUDENT_MIN_DESCRIPTION_LENGTH,
    minSkillsCount: STUDENT_MIN_SKILLS_COUNT,
  },
  [UserRole.Supervisor]: {
    maxBirthdayDate: SUPERVISOR_MAX_BIRTHDAY_DATE,
    maxCityLength: SUPERVISOR_MAX_CITY_LENGTH,
    maxContactLength: SUPERVISOR_MAX_CONTACT_LENGTH,
    maxDescriptionLength: SUPERVISOR_MAX_DESCRIPTION_LENGTH,
    maxSkillsCount: SUPERVISOR_MAX_SKILLS_COUNT,

    minBirthdayDate: SUPERVISOR_MIN_BIRTHDAY_DATE,
    minCityLength: SUPERVISOR_MIN_CITY_LENGTH,
    minContactLength: SUPERVISOR_MIN_CONTACT_LENGTH,
    minDescriptionLength: SUPERVISOR_MIN_DESCRIPTION_LENGTH,
    minSkillsCount: SUPERVISOR_MIN_SKILLS_COUNT,
  },
};
