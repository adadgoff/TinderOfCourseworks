import { CourseworkStatus } from "./types";

export const COURSEWORK_MIN_DESCRIPTION_LENGTH = 1;
export const COURSEWORK_MIN_SKILLS_COUNT = 1;
export const COURSEWORK_MIN_TITLE_LENGTH = 1;

export const COURSEWORK_MAX_DESCRIPTION_LENGTH = 200;
export const COURSEWORK_MAX_SKILLS_COUNT = 30;
export const COURSEWORK_MAX_TITLE_LENGTH = 50;

export const COURSEWORK_ICON_URL_DEFAULT = "/images/courseworks/default.png";
export const COURSEWORK_STATUSES = Object.values(CourseworkStatus);
