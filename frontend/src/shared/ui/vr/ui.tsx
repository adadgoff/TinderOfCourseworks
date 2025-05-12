import { ComponentProps } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";

interface VrProps extends ComponentProps<"div"> {}

export function Vr({ className, ...props }: VrProps) {
  const style = clsx(className, styles.vr);
  return <div {...props} className={style} />;
}

interface GreyVrProps extends VrProps {
  isStroke?: boolean;
}

export function GreyVr({ className, isStroke, ...props }: GreyVrProps) {
  const style = clsx(className, isStroke ? styles.greyStroke : styles.grey);
  return <Vr {...props} className={style} />;
}
