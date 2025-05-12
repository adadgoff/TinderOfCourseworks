import { ComponentProps } from "react";

export type ButtonDecor = "default" | "accent" | "grey";

export interface ButtonProps extends ComponentProps<"button"> {
  decor?: ButtonDecor;
}
