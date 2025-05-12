import { Student } from "../student";
import { Supervisor } from "../supervisor";

export interface UserBaseProps {
  id: string;
  email: string;
  password: string;
  surname: string;
  name: string;
  patronymic: string;
}

export enum UserRole {
  Student = "student",
  Supervisor = "supervisor",
}

export type User = Student | Supervisor;
