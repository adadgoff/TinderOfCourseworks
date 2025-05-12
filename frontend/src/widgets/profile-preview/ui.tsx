import Link from "next/link";
import styles from "./styles.module.scss";
import { ComponentProps } from "react";
import { User, UserRole } from "@/entities/user/types";
import { Student } from "@/entities/student";
import clsx from "clsx";
import { ProfileBase } from "../profile-base";

interface ProfilePreviewProps extends ComponentProps<"article"> {
  user: User;
}

export function ProfilePreview({ className, user }: ProfilePreviewProps) {
  const role: UserRole =
    user instanceof Student ? UserRole.Student : UserRole.Supervisor;

  return (
    <Link
      className={clsx(styles.profilePreview, className)}
      href={`/${role}/profile/${user.id}`}
      target="_blank"
    >
      <ProfileBase key={user.id} {...user} />
    </Link>
  );
}
