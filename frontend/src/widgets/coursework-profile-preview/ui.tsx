import { CourseworkPreview } from "../coursework-preview";
import styles from "./styles.module.scss";
import { ProfilePreview } from "../profile-preview";
import { Coursework } from "@/entities/types/coursework";
import { User } from "@/entities/types/user";
import { UserRole } from "@/entities/user/types";

interface CourseworkProfilePreviewProps {
  coursework: Coursework;
  courseworkHref: string;
  user: User;
  userHref: string;
}

export function CourseworkProfilePreview({
  coursework,
  courseworkHref,
  user,
  userHref,
}: CourseworkProfilePreviewProps) {
  return (
    <>
      <CourseworkPreview
        className={styles.courseworkPreview}
        coursework={coursework}
        href={courseworkHref}
      />

      <ProfilePreview
        className={styles.profilePreview}
        href={userHref}
        user={user}
      />
    </>
  );
}
