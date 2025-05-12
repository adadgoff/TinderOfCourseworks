import { ComponentProps } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";

interface TabsProps extends ComponentProps<"div"> {
  options: [string, string, ...string[]];
  currentOption: string;
  setCurrentOption: (option: string) => void;
}

export function ToggleButtonGroup({
  options,
  currentOption,
  setCurrentOption,
  className,
  ...props
}: TabsProps) {
  const style = clsx(styles.tabs, className);

  return (
    <div className={style} {...props}>
      {options.map((option, index) => (
        <button
          className={clsx(
            styles.tabButton,
            option === currentOption && styles.selected,
          )}
          key={index}
          onClick={() => setCurrentOption(option)}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  );
}
