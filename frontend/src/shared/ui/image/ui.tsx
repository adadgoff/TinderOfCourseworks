import { ComponentProps } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { ImageSize } from "./types";

interface ImageProps extends ComponentProps<"img"> {
  size?: ImageSize;
}

export function Img({ className, size = "m", src, ...props }: ImageProps) {
  const style = clsx(styles.img, styles[`size-${size}`], className);
  return <img className={style} src={src} {...props} />;
}
