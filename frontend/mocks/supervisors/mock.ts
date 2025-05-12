import { Supervisor } from "@/entities/supervisor";
import { MOCK_SKILLS } from "../skills";

export const MOCK_SUPERVISORS: Supervisor[] = [
  new Supervisor({
    id: "sup1",
    email: "professor1@university.edu",
    password: "academic123",
    name: "Richard",
    surname: "Brown",
    patronymic: "James",
    city: "San Francisco",
    contact: "sup1 contact",
    birthDay: new Date(1975, 8, 10),
    description: "Computer Science Professor specializing in algorithms",
    skills: [MOCK_SKILLS[2], MOCK_SKILLS[3], MOCK_SKILLS[7]],
  }),
  new Supervisor({
    id: "sup2",
    email: "professor2@university.edu",
    password: "teach456",
    name: "Sarah",
    surname: "Davis",
    patronymic: "Elizabeth",
    city: "Seattle",
    contact: "sup2 contact",
    birthDay: new Date(1980, 3, 22),
    description: "Artificial Intelligence expert and researcher",
    skills: [MOCK_SKILLS[1], MOCK_SKILLS[5], MOCK_SKILLS[7]],
  }),
  new Supervisor({
    id: "sup3",
    email: "dr.miller@university.edu",
    password: "science789",
    name: "Robert",
    surname: "Wilson",
    patronymic: "Thomas",
    city: "Austin",
    contact: "sup3 contact",
    birthDay: new Date(1968, 6, 30),
    description: "Senior researcher in systems programming",
    skills: [MOCK_SKILLS[3], MOCK_SKILLS[4], MOCK_SKILLS[2]],
  }),
];
