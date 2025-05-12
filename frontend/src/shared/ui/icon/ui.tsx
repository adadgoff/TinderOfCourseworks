"use client";

import { ComponentProps } from "react";
import clsx from "clsx";
import { IconName, IconSize } from "./types";
import styles from "./styles.module.scss";
import { ReactSVG } from "react-svg";

export interface IconProps extends Omit<ComponentProps<"div">, "name"> {
  name: IconName;
  size?: IconSize;
}

export function Icon({ name, size = "m", className }: IconProps) {
  const [category, icon] = name.split("/");
  const style = clsx(styles.icon, styles[`size-${size}`], className);
  return <ReactSVG className={style} src={`/icons/${category}/${icon}.svg`} />;
}
