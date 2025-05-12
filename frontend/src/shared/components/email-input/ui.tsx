import {
  USER_MAX_EMAIL_LENGTH,
  USER_MIN_EMAIL_LENGTH,
} from "@/entities/user/consts";
import { Input } from "@/shared/ui/input";

export function EmailInput({
  email,
  setEmail,
}: {
  email: string;
  setEmail?: (email: string) => void;
}) {
  return (
    <Input
      infoText="Your email."
      inputName="Email"
      maxLength={USER_MAX_EMAIL_LENGTH}
      minLength={USER_MIN_EMAIL_LENGTH}
      placeholder="example@mail.com"
      setValue={setEmail}
      type="email"
      value={email}
    />
  );
}
