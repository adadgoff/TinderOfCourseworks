import { Input } from "@/shared/ui/input";

export function FullNameInput({
  name,
  patronymic,
  surname,
}: {
  name: string;
  patronymic: string;
  surname: string;
}) {
  return (
    <Input
      infoText="Surname, name and patronymic."
      inputName="Full Name"
      placeholder="full name"
      type="text"
      value={[surname, name, patronymic].join(" ")}
    />
  );
}
