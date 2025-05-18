import { InputDate } from "@/shared/ui/input-date";

export function BirthdayInput({
  birthday,
  infoText,
  max,
  min,
  setBirthday,
}: {
  birthday: Date;
  infoText: string;
  max?: Date;
  min?: Date;
  setBirthday?: (birthday: Date) => void;
}) {
  return (
    <InputDate
      iconName="user/birthday"
      infoText={infoText}
      inputDateName="Birthday"
      max={max}
      min={min}
      setValue={setBirthday}
      value={birthday}
    />
  );
}
