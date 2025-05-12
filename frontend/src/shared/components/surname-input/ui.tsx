import {
  USER_MAX_SURNAME_LENGTH,
  USER_MIN_SURNAME_LENGTH,
} from "@/entities/user/consts";
import { Input } from "@/shared/ui/input";

export function SurnameInput({
  setSurname,
  surname,
}: {
  setSurname?: (surname: string) => void;
  surname: string;
}) {
  return (
    <Input
      infoText="Your surname."
      inputName="Surname"
      maxLength={USER_MAX_SURNAME_LENGTH}
      minLength={USER_MIN_SURNAME_LENGTH}
      placeholder="surname"
      setValue={setSurname}
      type="text"
      value={surname}
    />
  );
}
