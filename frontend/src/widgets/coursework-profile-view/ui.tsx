import styles from "./styles.module.scss";
import { CourseworkView } from "../coursework-view";
import { ProfileView } from "../profile-view";
import { Hr } from "@/shared/ui/hr";
import { Coursework } from "@/entities/types/coursework";
import { User } from "@/entities/types/user";
import { UserRole } from "@/entities/user/types";

interface CourseworkProfileViewProps {
  coursework: Coursework;
  role: UserRole;
  user: User;
}

export function CourseworkProfileView({
  coursework,
  role,
  user,
}: CourseworkProfileViewProps) {
  return (
    <>
      <CourseworkView
        className={styles.courseworkView}
        coursework={coursework}
      />
      <Hr className={styles.hr} />
      <ProfileView className={styles.profileView} role={role} user={user} />
    </>
  );
}
