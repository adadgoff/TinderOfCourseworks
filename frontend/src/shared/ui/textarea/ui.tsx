import { GreyP } from "../p";
import styles from "./styles.module.scss";
import { ChangeEvent, ComponentProps } from "react";

interface TextAreaProps extends ComponentProps<"textarea"> {
  infoText: string;
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
  required?: boolean;
  setValue?: (value: string) => void;
  textAreaName: string;
  value: string;
}

export function TextArea({
  infoText,
  maxLength,
  minLength,
  placeholder,
  required = true,
  setValue,
  textAreaName,
  value,
  ...props
}: TextAreaProps) {
  const readOnly = !(maxLength && minLength && setValue);
  const textAreaId = `textarea-${textAreaName}`;

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    if (readOnly) return;
    setValue(event.target.value);
  }

  return (
    <div className={styles.textArea}>
      <header className={styles.header}>
        <label className={styles.left} htmlFor={textAreaId}>
          <label htmlFor={textAreaId}>
            <GreyP>{textAreaName}</GreyP>
          </label>
          <label
            className={styles.info}
            data-info={infoText}
            htmlFor={textAreaId}
          >
            <GreyP>?</GreyP>
          </label>
        </label>

        {!readOnly && (
          <div className={styles.right}>
            <label htmlFor={textAreaId}>
              <GreyP>
                {value.length}/{maxLength}
              </GreyP>
            </label>
          </div>
        )}
      </header>

      <textarea
        id={textAreaId}
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
