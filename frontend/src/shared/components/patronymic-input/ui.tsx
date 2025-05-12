import {
  USER_MAX_PATRONYMIC_LENGTH,
  USER_MIN_PATRONYMIC_LENGTH,
} from "@/entities/user/consts";
import { Input } from "@/shared/ui/input";

export function PatronymicInput({
  patronymic,
  setPatronymic,
}: {
  patronymic: string;
  setPatronymic?: (patronymic: string) => void;
}) {
  return (
    <Input
      infoText="Your patronymic."
      inputName="Patronymic"
      maxLength={USER_MAX_PATRONYMIC_LENGTH}
      minLength={USER_MIN_PATRONYMIC_LENGTH}
      placeholder="patronymic"
      setValue={setPatronymic}
      type="text"
      value={patronymic}
    />
  );
}
