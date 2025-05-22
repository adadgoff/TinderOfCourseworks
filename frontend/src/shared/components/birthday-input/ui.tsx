import { InputDate } from "@/shared/ui/input-date";

export function BirthdayInput({
  birthday,
  infoText,
  max,
  min,
  setBirthday,
}: {
  birthday: string;
  infoText: string;
  max?: string;
  min?: string;
  setBirthday?: (birthday: string) => void;
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
