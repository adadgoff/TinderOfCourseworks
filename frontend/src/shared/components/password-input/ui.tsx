import {
  USER_MAX_PASSWORD_LENGTH,
  USER_MIN_PASSWORD_LENGTH,
} from "@/entities/user/consts";
import { Input } from "@/shared/ui/input";

export function PasswordInput({
  infoText = "Your password.",
  inputName = "Password",
  password,
  placeholder = "password",
  setPassword,
}: {
  infoText?: string;
  inputName?: string;
  password: string;
  placeholder?: string;
  setPassword?: (password: string) => void;
}) {
  return (
    <Input
      infoText={infoText}
      inputName={inputName}
      maxLength={USER_MAX_PASSWORD_LENGTH}
      minLength={USER_MIN_PASSWORD_LENGTH}
      placeholder={placeholder}
      setValue={setPassword}
      type="password"
      value={password}
    />
  );
}
