import styles from "./styles.module.scss";
import { Coursework } from "@/entities/coursework";
import { TitleInput } from "@/shared/components/title-input";
import { DescriptionTextArea } from "@/shared/components/description-textarea";
import { ImgInput } from "@/shared/components/img-input";
import { StatusSelect } from "@/shared/components/status-select";
import { SkillsInput } from "@/shared/components/skills-input";
import { ComponentProps } from "react";
import clsx from "clsx";

interface CourseworkViewProps extends ComponentProps<"article"> {
  coursework: Coursework;
}

export function CourseworkView({ className, coursework }: CourseworkViewProps) {
  return (
    <article className={clsx(styles.courseworkView, className)}>
      <div className={styles.iconTitle}>
        <ImgInput imgUrl={coursework.iconUrl} />
        <TitleInput title={coursework.title} />
      </div>
      <DescriptionTextArea
        description={coursework.description}
        infoText="Description of coursework."
      />
      <StatusSelect currentStatus={coursework.status} />
      <SkillsInput
        infoText="Required skills for coursework."
        skills={coursework.skills}
        skillsInputName="Required skills"
      />
    </article>
  );
}
