import { Skill } from "@/entities/skill";
import styles from "./styles.module.scss";
import { GreyP } from "@/shared/ui/p";
import { ComponentProps, KeyboardEvent } from "react";
import { Chip } from "@/shared/ui/chip";

interface SkillsInputProps extends ComponentProps<"input"> {
  infoText: string;
  maxCount?: number;
  minCount?: number;
  setSkills?: (skills: Skill[]) => void;
  skills: Skill[];
  skillsInputName: string;
}

export function SkillsInput({
  infoText,
  maxCount,
  minCount,
  setSkills,
  skills,
  skillsInputName,
  ...props
}: SkillsInputProps) {
  const readOnly = !(maxCount && minCount && setSkills);
  const skillsInputId = `skills-input-${skillsInputName}`;

  function handleDeleteSkill(skillName: string) {
    if (readOnly) return;
    setSkills(skills.filter((skill) => skill.name !== skillName));
  }
  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (readOnly) return;

    const inputValue = event.currentTarget.value.trim();

    if (event.key === "Enter") {
      event.preventDefault();
      const skillName = inputValue;

      if (
        skillName &&
        skills.every(
          (skill) => skill.name.toLowerCase() !== skillName.toLowerCase(),
        ) &&
        skills.length < maxCount
      ) {
        const newSkill = new Skill({ name: skillName });
        setSkills([...skills, newSkill]);
        event.currentTarget.value = "";
      }
    }

    if (
      event.key === "Backspace" &&
      inputValue.length === 0 &&
      skills.length > 0
    ) {
      event.preventDefault();
      const lastSkill = skills[skills.length - 1];
      handleDeleteSkill(lastSkill.name);
    }
  }

  return (
    <div className={styles.skillsInput}>
      <header className={styles.header}>
        <label className={styles.left} htmlFor={skillsInputId}>
          <label htmlFor={skillsInputId}>
            <GreyP>{skillsInputName}</GreyP>
          </label>
          <label
            className={styles.info}
            data-info={infoText}
            htmlFor={skillsInputId}
          >
            <GreyP>?</GreyP>
          </label>
        </label>

        {!readOnly && (
          <div className={styles.right}>
            <label htmlFor={skillsInputId}>
              <GreyP>
                {skills.length}/{maxCount}
              </GreyP>
            </label>
          </div>
        )}
      </header>

      <div className={styles.skills}>
        {skills.map((skill) => (
          <Chip
            isDeletable={!readOnly}
            key={skill.name}
            onDelete={() => handleDeleteSkill(skill.name)}
          >
            {skill.name}
          </Chip>
        ))}
        {!readOnly && skills.length < maxCount && (
          <input
            disabled={readOnly}
            className={styles.input}
            id={skillsInputId}
            onKeyDown={handleKeyDown}
            placeholder="type skill name and press `enter`"
            type="text"
            {...props}
          />
        )}
      </div>
    </div>
  );
}
