import { UUID } from "@/shared/types";
import { CourseworkStatus } from "../coursework/types";

export interface Coursework {
  id?: UUID;
  title: string;
  iconUrl?: string;
  description: string;
  lastChange?: string;
  status: CourseworkStatus;
  skills: string[];
}
