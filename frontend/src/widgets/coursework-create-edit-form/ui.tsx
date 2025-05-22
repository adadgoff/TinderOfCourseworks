"use client";

import styles from "./styles.module.scss";
import { CourseworkStatus } from "@/entities/coursework/types";
import { Coursework } from "@/entities/types/coursework";
import {
  COURSEWORK_ICON_URL_DEFAULT,
  COURSEWORK_MAX_DESCRIPTION_LENGTH,
  COURSEWORK_MAX_SKILLS_COUNT,
  COURSEWORK_MIN_DESCRIPTION_LENGTH,
  COURSEWORK_MIN_SKILLS_COUNT,
} from "@/entities/coursework/consts";
import { FormEvent, useReducer } from "react";
import { ActionHeader } from "../header-action";
import { GreyHr } from "@/shared/ui/hr";
import { ImgInput } from "@/shared/components/img-input";
import { TitleInput } from "@/shared/components/title-input";
import { DescriptionTextArea } from "@/shared/components/description-textarea";
import { StatusSelect } from "@/shared/components/status-select";
import { SkillsInput } from "@/shared/components/skills-input";
import { UserRole } from "@/entities/user/types";
import { useRouter } from "next/navigation";
import { createCoursework, editCoursework } from "@/pages_/api/courseworks";

interface CourseworkCreateFormProps {
  coursework?: never;
  mode: "create";
  role: UserRole;
  token: string;
}

interface CourseworkEditFormProps {
  coursework: Coursework;
  mode: "edit";
  role: UserRole;
  token: string;
}

type State = {
  title: string;
  iconUrl?: string;
  description: string;
  skills: string[];
  status: CourseworkStatus;
};

type Action =
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_ICON_URL"; payload: string }
  | { type: "SET_DESCRIPTION"; payload: string }
  | { type: "SET_SKILLS"; payload: string[] }
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
  token,
  role,
}: CourseworkCreateEditFormProps) {
  const router = useRouter();
  const isCreateForm = mode === "create";
  const initialState: State = isCreateForm
    ? {
        title: "",
        iconUrl: undefined,
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
    const initialStateSortedSkills = [...initialState.skills].sort();
    const stateSortedSkills = [...state.skills].sort();

    return (
      initialState.title === state.title &&
      initialState.description === state.description &&
      // initialState.iconUrl === state.iconUrl &&
      initialState.skills.length === state.skills.length &&
      initialState.status === state.status &&
      initialStateSortedSkills.every(
        (skill, index) => skill === stateSortedSkills[index],
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
    if (isCreateForm) {
      return;
    }

    dispatch({ type: "SET_TITLE", payload: coursework.title });
    // dispatch({ type: "SET_ICON_URL", payload: coursework.iconUrl });
    dispatch({ type: "SET_DESCRIPTION", payload: coursework.description });
    dispatch({ type: "SET_SKILLS", payload: coursework.skills });
    dispatch({ type: "SET_STATUS", payload: coursework.status });
  }
  async function handleCreateCoursework(event: FormEvent) {
    event.preventDefault();

    if (!isCreateForm) {
      return;
    }

    const createdCoursework = await createCoursework({
      coursework: {
        title: state.title,
        description: state.description,
        status: state.status,
        skills: state.skills,
      },
      role: role,
      token: token,
    });

    router.push(`/${role}/courseworks/${createdCoursework.id}/view`);
  }
  async function handleSaveChanges(event: FormEvent) {
    event.preventDefault();

    if (isCreateForm) {
      return;
    }

    const editedCoursework = await editCoursework({
      coursework: {
        id: coursework.id,
        title: state.title,
        description: state.description,
        status: state.status,
        skills: state.skills,
      },
      role: role,
      token: token,
    });

    router.push(`/${role}/courseworks/${editedCoursework.id}/view`);
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
  function setSkills(skills: string[]) {
    dispatch({ type: "SET_SKILLS", payload: skills });
  }
  function setStatus(status: string) {
    dispatch({ type: "SET_STATUS", payload: status as CourseworkStatus });
  }

  return (
    <form
      className={styles.courseworkCreateEditForm}
      onSubmit={isCreateForm ? handleCreateCoursework : handleSaveChanges}
    >
      <ActionHeader
        backUrl={`/${role}/courseworks`}
        isDisabled={getDisabled()}
        onCancelChangesClick={isCreateForm ? undefined : handleCancelChanges}
        onCreateCourseworkClick={handleCreateCoursework}
        onSaveChangesClick={handleSaveChanges}
        type={mode}
      />
      <GreyHr />
      <div className={styles.iconTitle}>
        <ImgInput
          imgUrl={COURSEWORK_ICON_URL_DEFAULT}
          // hintText="Upload icon"
          // onFileChange={setIconUrl}
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
