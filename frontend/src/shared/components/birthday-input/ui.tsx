import { InputDate } from "@/shared/ui/input-date";

export function BirthDayInput({
  birthDay,
  infoText,
  max,
  min,
  setBirthDay,
}: {
  birthDay: Date;
  infoText: string;
  max?: Date;
  min?: Date;
  setBirthDay?: (birthDay: Date) => void;
}) {
  return (
    <InputDate
      iconName="user/birthday"
      infoText={infoText}
      inputDateName="Birthday"
      max={max}
      min={min}
      setValue={setBirthDay}
      value={birthDay}
    />
  );
}
