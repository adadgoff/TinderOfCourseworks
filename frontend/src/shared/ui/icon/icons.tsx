import clsx from "clsx";
import styles from "./styles.module.scss";
import { Icon, IconProps } from "./ui";

interface GreyIconProps extends IconProps {
  isStroke?: boolean;
}

export function GreyIcon({
  className,
  isStroke = false,
  ...props
}: GreyIconProps) {
  const style = clsx(className, isStroke ? styles.greyStroke : styles.grey);
  return <Icon className={style} {...props} />;
}
