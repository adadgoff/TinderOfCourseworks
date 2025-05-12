"use client";

import { Skill } from "@/entities/skill";
import styles from "./styles.module.scss";
import { CourseworkStatus } from "@/entities/coursework/types";
import { Coursework } from "@/entities/coursework";
import {
  COURSEWORK_ICON_URL_DEFAULT,
  COURSEWORK_MAX_DESCRIPTION_LENGTH,
  COURSEWORK_MAX_SKILLS_COUNT,
  COURSEWORK_MIN_DESCRIPTION_LENGTH,
  COURSEWORK_MIN_SKILLS_COUNT,
} from "@/entities/coursework/consts";
import { useReducer } from "react";
import { compareSkills } from "@/entities/skill/compare";
import { ActionHeader } from "../header-action";
import { GreyHr } from "@/shared/ui/hr";
import { ImgInput } from "@/shared/components/img-input";
import { TitleInput } from "@/shared/components/title-input";
import { DescriptionTextArea } from "@/shared/components/description-textarea";
import { StatusSelect } from "@/shared/components/status-select";
import { SkillsInput } from "@/shared/components/skills-input";

interface CourseworkCreateFormProps {
  coursework?: never;
  mode: "create";
  onCreate?: (state: State) => void;
  onSave?: never;
}

interface CourseworkEditFormProps {
  coursework: Coursework;
  mode: "edit";
  onCreate?: never;
  onSave?: (state: State) => void;
}

type State = {
  title: string;
  iconUrl: string;
  description: string;
  skills: Skill[];
  status: CourseworkStatus;
};

type Action =
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_ICON_URL"; payload: string }
  | { type: "SET_DESCRIPTION"; payload: string }
  | { type: "SET_SKILLS"; payload: Skill[] }
  | { type: "SET_STATUS"; payload: CourseworkStatus };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_ICON_URL":
      return { ...state, iconUrl: action.payload };
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    case "SET_SKILLS":
      return { ...state, skills: action.payload };
    case "SET_STATUS":
      return { ...state, status: action.payload };
    default:
      return state;
  }
}

type CourseworkCreateEditFormProps =
  | CourseworkCreateFormProps
  | CourseworkEditFormProps;

export function CourseworkCreateEditForm({
  coursework,
  mode,
  onCreate,
  onSave,
}: CourseworkCreateEditFormProps) {
  const isCreateForm = mode === "create";
  const initialState: State = isCreateForm
    ? {
        title: "",
        iconUrl: COURSEWORK_ICON_URL_DEFAULT,
        description: "",
        skills: [],
        status: CourseworkStatus.Matching,
      }
    : {
        title: coursework.title,
        iconUrl: coursework.iconUrl,
        description: coursework.description,
        skills: coursework.skills,
        status: coursework.status,
      };
  const [state, dispatch] = useReducer(reducer, initialState);

  function getDisabled(): boolean {
    if (isCreateForm) {
      return (
        initialState.title === state.title ||
        initialState.description === state.description ||
        initialState.skills.length === state.skills.length
      );
    }
    // <=> mode === "edit".
    const initialStateSortedSkills = [...initialState.skills].sort(
      compareSkills,
    );
    const stateSortedSkills = [...state.skills].sort(compareSkills);

    return (
      initialState.title === state.title &&
      initialState.description === state.description &&
      initialState.iconUrl === state.iconUrl &&
      initialState.skills.length === state.skills.length &&
      initialState.status === state.status &&
      initialStateSortedSkills.every(
        (skill, index) => skill.name === stateSortedSkills[index].name,
      )
    );
  }
  function getDisabledStatuses(): CourseworkStatus[] {
    if (isCreateForm) {
      return [CourseworkStatus.Approved, CourseworkStatus.Cancelled];
    }
    // <=> mode === "edit".
    return coursework.status === CourseworkStatus.Approved
      ? [CourseworkStatus.Cancelled, CourseworkStatus.Matching]
      : [CourseworkStatus.Approved];
  }
  function getSetCurrentStatus(): typeof setStatus | undefined {
    if (isCreateForm) {
      return undefined;
    }
    // <=> mode === "edit".
    return coursework.status === CourseworkStatus.Approved
      ? undefined
      : setStatus;
  }

  function handleCancelChanges() {
    if (isCreateForm) return;
    dispatch({ type: "SET_TITLE", payload: coursework.title });
    dispatch({ type: "SET_ICON_URL", payload: coursework.iconUrl });
    dispatch({ type: "SET_DESCRIPTION", payload: coursework.description });
    dispatch({ type: "SET_SKILLS", payload: coursework.skills });
    dispatch({ type: "SET_STATUS", payload: coursework.status });
  }
  function handleCreateCoursework() {
    // TODO: implement.
  }
  function handleSaveChanges() {
    // TODO: implement.
  }

  function setTitle(title: string) {
    dispatch({ type: "SET_TITLE", payload: title });
  }
  function setIconUrl(file: File) {
    const reader = new FileReader();
    reader.addEventListener("loadend", function () {
      dispatch({ type: "SET_ICON_URL", payload: String(reader.result) });
    });
    reader.readAsDataURL(file);
  }
  function setDescription(description: string) {
    dispatch({ type: "SET_DESCRIPTION", payload: description });
  }
  function setSkills(skills: Skill[]) {
    dispatch({ type: "SET_SKILLS", payload: skills });
  }
  function setStatus(status: string) {
    dispatch({ type: "SET_STATUS", payload: status as CourseworkStatus });
  }

  return (
    <form className={styles.courseworkCreateEditForm}>
      <ActionHeader
        backUrl="/student/courseworks"
        isDisabled={getDisabled()}
        onCancelChangesClick={isCreateForm ? undefined : handleCancelChanges}
        onCreateCourseworkClick={
          isCreateForm ? handleCreateCoursework : undefined
        }
        onSaveChangesClick={isCreateForm ? undefined : handleSaveChanges}
        type={mode}
      />
      <GreyHr />
      <div className={styles.iconTitle}>
        <ImgInput
          imgUrl={state.iconUrl}
          hintText="Upload icon"
          onFileChange={setIconUrl}
        />
        <TitleInput title={state.title} setTitle={setTitle} />
      </div>
      <DescriptionTextArea
        description={state.description}
        infoText="Description of coursework."
        maxLength={COURSEWORK_MAX_DESCRIPTION_LENGTH}
        minLength={COURSEWORK_MIN_DESCRIPTION_LENGTH}
        placeholder="best coursework description"
        setDescription={setDescription}
      />
      {}
      <StatusSelect
        currentStatus={state.status}
        disabledStatuses={getDisabledStatuses()}
        setCurrentStatus={getSetCurrentStatus()}
      />
      <SkillsInput
        infoText="Required skills for coursework."
        maxCount={COURSEWORK_MAX_SKILLS_COUNT}
        minCount={COURSEWORK_MIN_SKILLS_COUNT}
        setSkills={setSkills}
        skills={state.skills}
        skillsInputName="Required skills"
      />
    </form>
  );
}
