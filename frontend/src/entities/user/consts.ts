import { UserRole } from "./types";

export const USER_MIN_EMAIL_LENGTH = 5;
export const USER_MIN_NAME_LENGTH = 1;
export const USER_MIN_PASSWORD_LENGTH = 1;
export const USER_MIN_PATRONYMIC_LENGTH = 1;
export const USER_MIN_SURNAME_LENGTH = 1;

export const USER_MAX_EMAIL_LENGTH = 255;
export const USER_MAX_NAME_LENGTH = 50;
export const USER_MAX_PASSWORD_LENGTH = 50;
export const USER_MAX_PATRONYMIC_LENGTH = 50;
export const USER_MAX_SURNAME_LENGTH = 50;

export const USER_ROLES = Object.values(UserRole);
