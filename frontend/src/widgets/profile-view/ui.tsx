"use client";

import styles from "./styles.module.scss";
import { Student } from "@/entities/student";
import { FullNameInput } from "@/shared/components/full-name-input";
import { CityInput } from "@/shared/components/city-input";
import { BirthdayInput } from "@/shared/components/birthday-input";
import { UserRole } from "@/entities/user/types";
import { LastOnline } from "@/shared/components/last-online";
import { DescriptionTextArea } from "@/shared/components/description-textarea";
import { ImgInput } from "@/shared/components/img-input";
import { SkillsInput } from "@/shared/components/skills-input";
import { ComponentProps } from "react";
import clsx from "clsx";
import { ContactInput } from "@/shared/components/contact-input";
import { User } from "@/entities/types/user";

interface ProfileViewProps extends ComponentProps<"article"> {
  role: UserRole;
  user: User;
}

export function ProfileView({ className, role, user }: ProfileViewProps) {
  return (
    <article className={clsx(styles.profileView, className)}>
      <div className={styles.details}>
        <div className={styles.iconLastOnline}>
          <ImgInput imgUrl={user.iconUrl} size="xl" />
          <LastOnline lastOnline={user.lastOnline!} />
        </div>

        <div className={styles.info}>
          <FullNameInput
            name={user.name}
            patronymic={user.patronymic}
            surname={user.surname}
          />
          <div className={styles.cityBirthday}>
            <CityInput city={user.city} infoText={`City of ${role}.`} />
            <BirthdayInput
              birthday={user.birthday}
              infoText={`Birthday of ${role}.`}
            />
          </div>
        </div>
      </div>

      <ContactInput contact={user.contact} infoText={`Contact of ${role}.`} />

      <DescriptionTextArea
        description={user.description}
        infoText={`Description of ${role}.`}
      />
      <SkillsInput
        infoText="Skills and Professional Interests."
        skills={user.skills}
        skillsInputName="Skills and Professional Interests"
      />
    </article>
  );
}
