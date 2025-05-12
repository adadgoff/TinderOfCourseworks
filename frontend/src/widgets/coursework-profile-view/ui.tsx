import styles from "./styles.module.scss";
import { Coursework } from "@/entities/coursework";
import { User } from "@/entities/user/types";
import { CourseworkView } from "../coursework-view";
import { ProfileView } from "../profile-view";
import { Hr } from "@/shared/ui/hr";

interface CourseworkProfileViewProps {
  coursework: Coursework;
  user: User;
}

export function CourseworkProfileView({
  coursework,
  user,
}: CourseworkProfileViewProps) {
  return (
    <>
      <CourseworkView
        className={styles.courseworkView}
        coursework={coursework}
      />
      <Hr className={styles.hr} />
      <ProfileView className={styles.profileView} user={user} />
    </>
  );
}
