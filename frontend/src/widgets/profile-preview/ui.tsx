import Link from "next/link";
import styles from "./styles.module.scss";
import { ComponentProps } from "react";
import { UserRole } from "@/entities/user/types";
import clsx from "clsx";
import { ProfileBase } from "../profile-base";
import { User } from "@/entities/types/user";

interface ProfilePreviewProps extends ComponentProps<"article"> {
  href: string;
  user: User;
}

export function ProfilePreview({ className, href, user }: ProfilePreviewProps) {
  return (
    <Link
      className={clsx(styles.profilePreview, className)}
      href={href}
      target="_blank"
    >
      <ProfileBase key={user.id} {...user} />
    </Link>
  );
}
