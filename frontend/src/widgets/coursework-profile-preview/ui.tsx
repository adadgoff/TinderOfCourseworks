import { Coursework } from "@/entities/coursework";
import { CourseworkPreview } from "../coursework-preview";
import styles from "./styles.module.scss";
import { User } from "@/entities/user/types";
import { ProfilePreview } from "../profile-preview";

interface CourseworkProfilePreviewProps {
  coursework: Coursework;
  user: User;
}

export function CourseworkProfilePreview({
  coursework,
  user,
}: CourseworkProfilePreviewProps) {
  return (
    <>
      <CourseworkPreview
        className={styles.courseworkPreview}
        coursework={coursework}
      />

      <ProfilePreview className={styles.profilePreview} user={user} />
    </>
  );
}
