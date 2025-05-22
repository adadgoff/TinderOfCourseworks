import { UUID } from "@/shared/types";

export interface User {
  id: UUID;
  email: string;
  surname: string;
  name: string;
  patronymic: string;
  iconUrl: string;
  lastOnline?: string;
  city: string;
  contact: string;
  birthday: string;
  description: string;
  skills: string[];
}
