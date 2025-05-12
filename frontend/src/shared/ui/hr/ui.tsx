import { ComponentProps } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";

interface HrProps extends ComponentProps<"hr"> {
  isStroke?: boolean;
}

export function Hr({ className, ...props }: HrProps) {
  const style = clsx(className, styles.hr);
  return <hr {...props} className={style} />;
}

export function GreyHr({ className, isStroke, ...props }: HrProps) {
  const style = clsx(className, isStroke ? styles.greyStroke : styles.grey);
  return <Hr {...props} className={style} />;
}
