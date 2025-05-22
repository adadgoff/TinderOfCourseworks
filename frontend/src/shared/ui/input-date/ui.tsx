import { ChangeEvent, ComponentProps } from "react";
import { IconName } from "../icon/types";
import styles from "./styles.module.scss";
import { GreyIcon } from "../icon";
import { GreyP } from "../p";
import { formatDateByLocale, Locale } from "@/shared/lib/date";

interface InputDateProps
  extends Omit<ComponentProps<"input">, "max" | "min" | "value"> {
  iconName?: IconName;
  infoText: string;
  inputDateName: string;
  max?: string;
  min?: string;
  required?: boolean;
  setValue?: (value: string) => void;
  value: string;
}

export function InputDate({
  iconName,
  infoText,
  inputDateName,
  max,
  min,
  required = true,
  setValue,
  value,
  ...props
}: InputDateProps) {
  const readOnly = !(max && min && setValue);
  const inputDateId = `input-date-${inputDateName}`;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (readOnly) return;
    setValue?.(event.target.value);
  }

  return (
    <div className={styles.inputDate}>
      <header className={styles.header}>
        <label className={styles.left} htmlFor={inputDateId}>
          {iconName && (
            <label htmlFor={inputDateId}>
              <GreyIcon name={iconName} isStroke={true} size="s" />
            </label>
          )}
          <label htmlFor={inputDateId}>
            <GreyP>{inputDateName}</GreyP>
          </label>
          <label
            className={styles.info}
            data-info={infoText}
            htmlFor={inputDateId}
          >
            <GreyP>?</GreyP>
          </label>
        </label>

        {!readOnly && (
          <label className={styles.right} htmlFor={inputDateId}>
            <label htmlFor={inputDateId}>
              <GreyP className={styles.restrictions}>
                {min}–{max}
              </GreyP>
            </label>
          </label>
        )}
      </header>

      <input
        id={inputDateId}
        max={max ? max : undefined}
        min={min ? min : undefined}
        onChange={handleChange}
        readOnly={readOnly}
        required={required}
        type="date"
        value={value}
        {...props}
      />
    </div>
  );
}
