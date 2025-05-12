import styles from "./styles.module.scss";
import clsx from "clsx";
import { ButtonProps } from "./types";

export function Button({
  decor = "default",
  className,
  ...props
}: ButtonProps) {
  const style = clsx(
    styles.button,
    decor === "accent" && styles.accent,
    decor === "grey" && styles.grey,
    className,
  );
  return <button {...props} className={style} />;
}
