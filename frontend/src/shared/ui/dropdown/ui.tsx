import clsx from "clsx";
import styles from "./styles.module.scss";
import { ReactNode } from "react";
import { Icon } from "../icon";

interface DropDownProps {
  children: ReactNode;
  header: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function DropDown({
  children,
  header,
  isOpen,
  setIsOpen,
}: DropDownProps) {
  return (
    <div className={styles.dropDown}>
      <div
        className={clsx(styles.header, isOpen && styles.open)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {header}
        <Icon
          className={clsx(styles.arrow, isOpen && styles.open)}
          name="common/arrow-down"
          size="xs"
        />
      </div>

      <div className={clsx(styles.content, isOpen && styles.open)}>
        {children}
      </div>
    </div>
  );
}
