import { GreyIcon } from "../icon";
import { IconName } from "../icon/types";
import { GreyP } from "../p";
import styles from "./styles.module.scss";
import { ChangeEvent, ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
  iconName?: IconName;
  infoText: string;
  inputName: string;
  maxLength?: number;
  minLength?: number;
  placeholder: string;
  required?: boolean;
  setValue?: (value: string) => void;
  value: string;
}

export function Input({
  iconName,
  infoText,
  inputName,
  maxLength,
  minLength,
  placeholder,
  required = true,
  setValue,
  value,
  ...props
}: InputProps) {
  const readOnly = !(maxLength && minLength && setValue);
  const inputId = `input-${inputName}`;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (readOnly) return;
    setValue(event.target.value);
  }

  return (
    <div className={styles.input}>
      <header className={styles.header}>
        <label className={styles.left} htmlFor={inputId}>
          {iconName && (
            <label htmlFor={inputId}>
              <GreyIcon name={iconName} isStroke={true} size="s" />
            </label>
          )}
          <label htmlFor={inputId}>
            <GreyP>{inputName}</GreyP>
          </label>
          <label className={styles.info} data-info={infoText} htmlFor={inputId}>
            <GreyP>?</GreyP>
          </label>
        </label>

        {!readOnly && (
          <div className={styles.right}>
            <label htmlFor={inputId}>
              <GreyP>
                {value.length}/{maxLength}
              </GreyP>
            </label>
          </div>
        )}
      </header>

      <input
        id={inputId}
        maxLength={maxLength}
        minLength={minLength}
        onChange={handleChange}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required}
        value={value}
        {...props}
      />
    </div>
  );
}
