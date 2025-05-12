import {
  USER_MAX_NAME_LENGTH,
  USER_MIN_NAME_LENGTH,
} from "@/entities/user/consts";
import { Input } from "@/shared/ui/input";

export function NameInput({
  name,
  setName,
}: {
  name: string;
  setName?: (name: string) => void;
}) {
  return (
    <Input
      infoText="Your name."
      inputName="Name"
      maxLength={USER_MAX_NAME_LENGTH}
      minLength={USER_MIN_NAME_LENGTH}
      placeholder="name"
      setValue={setName}
      type="text"
      value={name}
    />
  );
}
