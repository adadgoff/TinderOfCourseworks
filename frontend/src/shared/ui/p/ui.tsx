import styles from "./styles.module.scss";
import clsx from "clsx";
import { ComponentProps } from "react";

interface PProps extends ComponentProps<"p"> {}

export function GreyP({ className, ...props }: PProps) {
  const style = clsx(className, styles.grey);
  return <p {...props} className={style} />;
}
