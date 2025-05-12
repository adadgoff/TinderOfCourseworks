"use client";

import { Skill } from "@/entities/skill";
import styles from "./styles.module.scss";
import { Student } from "@/entities/student";
import { UserRole } from "@/entities/user/types";
import { ActionHeader } from "@/widgets/header-action";
import { GreyHr } from "@/shared/ui/hr";
import { useReducer } from "react";
import { compareSkills } from "@/entities/skill/compare";
import { EmailInput } from "@/shared/components/email-input";
import { ImgInput } from "@/shared/components/img-input";
import { CityInput } from "@/shared/components/city-input";
import { BirthDayInput } from "@/shared/components/birthday-input";
import { SurnameInput } from "@/shared/components/surname-input";
import { NameInput } from "@/shared/components/name-input";
import { PatronymicInput } from "@/shared/components/patronymic-input";
import { DescriptionTextArea } from "@/shared/components/description-textarea";
import { MaxMinConfig } from "./config";
import { SkillsInput } from "@/shared/components/skills-input";
import { User } from "@/entities/user/types";
import { ContactInput } from "@/shared/components/contact-input";

type State = {
  birthDay: Date;
  city: string;
  contact: string;
  description: string;
  // email: string;
  iconUrl: string;
  name: string;
  patronymic: string;
  skills: Skill[];
  surname: string;
};

type Action =
  | { type: "SET_BIRTHDAY"; payload: Date }
  | { type: "SET_CITY"; payload: string }
  | { type: "SET_CONTACT"; payload: string }
  | { type: "SET_DESCRIPTION"; payload: string }
  | { type: "SET_ICON_URL"; payload: string }
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_PATRONYMIC"; payload: string }
  | { type: "SET_SKILLS"; payload: Skill[] }
  | { type: "SET_SURNAME"; payload: string };

function getDisabled(user: User, state: State): boolean {
  const userSortedSkills = [...user.skills].sort(compareSkills);
  const stateSortedSkills = [...state.skills].sort(compareSkills);

  return (
    user.birthDay === state.birthDay &&
    user.city === state.city &&
    user.contact === state.contact &&
    user.description === state.description &&
    user.name === state.name &&
    user.patronymic === state.patronymic &&
    user.skills.length === state.skills.length &&
    user.surname === state.surname &&
    userSortedSkills.every(
      (skill, index) => skill.name === stateSortedSkills[index].name,
    )
  );
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_BIRTHDAY":
      return { ...state, birthDay: action.payload };
    case "SET_CITY":
      return { ...state, city: action.payload };
    case "SET_CONTACT":
      return { ...state, contact: action.payload };
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    case "SET_ICON_URL":
      return { ...state, iconUrl: action.payload };
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_PATRONYMIC":
      return { ...state, patronymic: action.payload };
    case "SET_SKILLS":
      return { ...state, skills: action.payload };
    case "SET_SURNAME":
      return { ...state, surname: action.payload };
    default:
      return state;
  }
}

export function ProfileEditForm({ user }: { user: User }) {
  const role: UserRole =
    user instanceof Student ? UserRole.Student : UserRole.Supervisor;
  const maxMinConfig = MaxMinConfig[role];

  const [state, dispatch] = useReducer(reducer, {
    birthDay: user.birthDay,
    city: user.city,
    contact: user.contact,
    description: user.description,
    iconUrl: user.iconUrl,
    name: user.name,
    patronymic: user.patronymic,
    skills: user.skills,
    surname: user.surname,
  });

  function handleCancelChanges() {
    dispatch({ type: "SET_BIRTHDAY", payload: user.birthDay });
    dispatch({ type: "SET_CITY", payload: user.city });
    dispatch({ type: "SET_CONTACT", payload: user.contact });
    dispatch({ type: "SET_DESCRIPTION", payload: user.description });
    dispatch({ type: "SET_ICON_URL", payload: user.iconUrl });
    dispatch({ type: "SET_NAME", payload: user.name });
    dispatch({ type: "SET_PATRONYMIC", payload: user.patronymic });
    dispatch({ type: "SET_SKILLS", payload: user.skills });
    dispatch({ type: "SET_SURNAME", payload: user.surname });
  }
  function handleSaveChanges() {
    // TODO: implement.
  }

  function setBirthDay(birthDay: Date) {
    dispatch({ type: "SET_BIRTHDAY", payload: birthDay });
  }
  function setCity(city: string) {
    dispatch({ type: "SET_CITY", payload: city });
  }
  function setContact(contact: string) {
    dispatch({ type: "SET_CONTACT", payload: contact });
  }
  function setDescription(description: string) {
    dispatch({ type: "SET_DESCRIPTION", payload: description });
  }
  function setIconUrl(file: File) {
    const reader = new FileReader();
    reader.addEventListener("loadend", function () {
      dispatch({ type: "SET_ICON_URL", payload: String(reader.result) });
    });
    reader.readAsDataURL(file);
  }
  function setName(name: string) {
    dispatch({ type: "SET_NAME", payload: name });
  }
  function setPatronymic(patronymic: string) {
    dispatch({ type: "SET_PATRONYMIC", payload: patronymic });
  }
  function setSkills(skills: Skill[]) {
    dispatch({ type: "SET_SKILLS", payload: skills });
  }
  function setSurname(surname: string) {
    dispatch({ type: "SET_SURNAME", payload: surname });
  }

  return (
    <form className={styles.profileEdit}>
      <ActionHeader
        backUrl={`/${role}/profile`}
        isDisabled={getDisabled(user, state)}
        onCancelChangesClick={handleCancelChanges}
        onSaveChangesClick={handleSaveChanges}
        type="edit"
      />

      <GreyHr />

      <EmailInput email={user.email} />

      <div className={styles.details}>
        <div className={styles.iconFullname}>
          <ImgInput
            imgUrl={state.iconUrl}
            hintText="Upload avatar"
            onFileChange={setIconUrl}
            size="xxl"
          />

          <div className={styles.fullname}>
            <SurnameInput surname={state.surname} setSurname={setSurname} />
            <NameInput name={state.name} setName={setName} />
            <PatronymicInput
              patronymic={state.patronymic}
              setPatronymic={setPatronymic}
            />
          </div>
        </div>

        <CityInput
          city={state.city}
          infoText="Your city."
          maxLength={maxMinConfig.maxCityLength}
          minLength={maxMinConfig.minCityLength}
          setCity={setCity}
        />

        <BirthDayInput
          birthDay={state.birthDay}
          infoText="Your Birthday."
          max={maxMinConfig.maxBirthdayDate}
          min={maxMinConfig.minBirthdayDate}
          setBirthDay={setBirthDay}
        />
      </div>

      <ContactInput
        contact={state.contact}
        infoText="Your contact."
        maxLength={maxMinConfig.maxContactLength}
        minLength={maxMinConfig.minContactLength}
        setContact={setContact}
      />

      <DescriptionTextArea
        description={state.description}
        infoText="Write about yourself."
        maxLength={maxMinConfig.maxDescriptionLength}
        minLength={maxMinConfig.minDescriptionLength}
        placeholder="best profile description"
        setDescription={setDescription}
      />
      <SkillsInput
        infoText="Write your Skills and Professional Interests."
        maxCount={maxMinConfig.maxSkillsCount}
        minCount={maxMinConfig.minSkillsCount}
        setSkills={setSkills}
        skills={state.skills}
        skillsInputName="Skills and Professional Interests"
      />
    </form>
  );
}
