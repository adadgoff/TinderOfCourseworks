import { ComponentProps } from "react";
import styles from "./styles.module.scss";
import { GreyP } from "../p";

interface SelectProps extends ComponentProps<"select"> {
  currentOption: string;
  disabledOptions?: string[];
  infoText: string;
  options: string[];
  selectName: string;
  setCurrentOption?: (option: string) => void;
}

export function Select({
  currentOption,
  disabledOptions = [],
  infoText,
  options,
  selectName,
  setCurrentOption,
  ...props
}: SelectProps) {
  const disabled = !setCurrentOption;
  const selectId = `select-${selectName}`;

  function handleChangeOption(event: React.ChangeEvent<HTMLSelectElement>) {
    if (disabled) return;
    setCurrentOption?.(event.target.value);
  }

  return (
    <div className={styles.select}>
      <header className={styles.header}>
        <label className={styles.left} htmlFor={selectId}>
          <label htmlFor={selectId}>
            <GreyP>{selectName}</GreyP>
          </label>
          <label
            className={styles.info}
            data-info={infoText}
            htmlFor={selectId}
          >
            <GreyP>?</GreyP>
          </label>
        </label>
      </header>

      <select
        defaultValue={currentOption}
        id={selectId}
        onChange={handleChangeOption}
        disabled={disabled}
        {...props}
      >
        {options.map((option, index) => (
          <option
            className={styles.option}
            disabled={disabledOptions.includes(option)}
            key={index}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
