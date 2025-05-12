import Link from "next/link";
import styles from "./styles.module.scss";
import { Coursework } from "@/entities/coursework";
import { CourseworkBase } from "@/widgets/coursework-base";
import { ComponentProps } from "react";
import clsx from "clsx";

interface CourseworkPreviewProps extends ComponentProps<"article"> {
  coursework: Coursework;
}

export function CourseworkPreview({
  className,
  coursework,
}: CourseworkPreviewProps) {
  return (
    <Link
      className={clsx(styles.courseworkPreview, className)}
      href={`/student/courseworks/${coursework.id}/view`}
      target="_blank"
    >
      <CourseworkBase key={coursework.id} {...coursework} />
    </Link>
  );
}
