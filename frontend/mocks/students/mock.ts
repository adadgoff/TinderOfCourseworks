import { Student } from "@/entities/student";
import { MOCK_SKILLS } from "../skills";

export const MOCK_STUDENTS: Student[] = [
  new Student({
    id: "s1",
    email: "student1@university.edu",
    password: "secure123",
    name: "John",
    surname: "Smith",
    patronymic: "Michael",
    city: "New York",
    contact: "s1 contact",
    birthday: new Date(2000, 5, 15),
    description: "3rd year CS student interested in backend development",
    skills: [MOCK_SKILLS[1], MOCK_SKILLS[4], MOCK_SKILLS[7]],
    lastOnline: new Date(2024, 0),
  }),
  new Student({
    id: "s2",
    email: "student2@university.edu",
    password: "qwerty456",
    name: "Emily",
    surname: "Johnson",
    patronymic: "Anne",
    city: "Boston",
    contact: "s2 contact",
    birthday: new Date(2001, 2, 28),
    description: "Passionate about machine learning and data analysis",
    skills: [MOCK_SKILLS[1], MOCK_SKILLS[5], MOCK_SKILLS[6]],
    iconUrl:
      "https://www.unswcollege.edu.au/content/dam/images/unsw-college/websites/2023-05-website-assets/2019-05-Graduation-0195-SQ.cropimg.width=700.crop=square.jpg",
    lastOnline: new Date(2020, 0),
  }),
  new Student({
    id: "s3",
    email: "student3@university.edu",
    password: "pass789word",
    name: "David",
    surname: "Williams",
    patronymic: "Robert",
    city: "Chicago",
    contact: "s3 contact",
    birthday: new Date(1999, 11, 5),
    description: "Fullstack developer with web application experience",
    skills: [MOCK_SKILLS[0], MOCK_SKILLS[5], MOCK_SKILLS[6]],
    iconUrl:
      "https://media.gettyimages.com/id/1277110082/photo/studio-portrait-of-a-man-gesturing-a-stop-sign.jpg?s=612x612&w=gi&k=20&c=EyMTokHYjFG-4hnvHeYFU1thsUaYnDuMi9cmDbgc4k4=",
    lastOnline: new Date(2018, 0),
  }),
];
