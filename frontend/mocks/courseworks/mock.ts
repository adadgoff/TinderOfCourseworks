import { Coursework } from "@/entities/coursework";
import { CourseworkStatus } from "@/entities/coursework/types";
import { MOCK_SKILLS } from "../skills";

export const MOCK_COURSEWORKS: Coursework[] = [
  new Coursework({
    id: "0",
    title: "Online Cinema",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2699/2699194.png",
    description:
      "My personal online cinema. Watch anime, movies and series with me! <3",
    lastChange: new Date(2025, 4, 3),
    skills: [MOCK_SKILLS[2], MOCK_SKILLS[5], MOCK_SKILLS[6]],
    status: CourseworkStatus.Approved,
  }),
  new Coursework({
    id: "1",
    title: "My Stack",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/7307/7307974.png",
    description:
      "Identify the skills you have and the level of proficiency. Send your profile to employers instead of CV.",
    lastChange: new Date(2025, 4, 1),
    skills: [MOCK_SKILLS[0], MOCK_SKILLS[5]],
    status: CourseworkStatus.Cancelled,
  }),
  new Coursework({
    id: "2",
    title: "Exams Preparation Bot",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/8296/8296432.png",
    description:
      "Bot answers students on questions relates to exam preparation.",
    skills: [MOCK_SKILLS[1], MOCK_SKILLS[6], MOCK_SKILLS[7]],
  }),
];
