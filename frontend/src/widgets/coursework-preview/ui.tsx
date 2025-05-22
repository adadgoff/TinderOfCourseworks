"use client";

import Link from "next/link";
import styles from "./styles.module.scss";
import { CourseworkBase } from "@/widgets/coursework-base";
import { ComponentProps } from "react";
import clsx from "clsx";
import { UserRole } from "@/entities/user/types";
import { Coursework } from "@/entities/types/coursework";

interface CourseworkPreviewProps extends ComponentProps<"article"> {
  coursework: Coursework;
  href: string;
}

export function CourseworkPreview({
  className,
  coursework,
  href,
}: CourseworkPreviewProps) {
  return (
    <Link
      className={clsx(styles.courseworkPreview, className)}
      href={href}
      target="_blank"
    >
      <CourseworkBase key={coursework.id} {...coursework} />
    </Link>
  );
}
