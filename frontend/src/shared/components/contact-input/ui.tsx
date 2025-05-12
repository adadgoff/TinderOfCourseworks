import { Input } from "@/shared/ui/input";

export function ContactInput({
  contact,
  infoText,
  maxLength,
  minLength,
  setContact,
}: {
  contact: string;
  infoText: string;
  maxLength?: number;
  minLength?: number;
  setContact?: (contact: string) => void;
}) {
  return (
    <Input
      infoText={infoText}
      inputName="Contact"
      maxLength={maxLength}
      minLength={minLength}
      placeholder="tel: +7 (999) 123-45-67"
      setValue={setContact}
      type="text"
      value={contact}
    />
  );
}
