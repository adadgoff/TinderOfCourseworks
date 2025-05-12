import { Input } from "@/shared/ui/input";

export function CityInput({
  city,
  infoText,
  maxLength,
  minLength,
  setCity,
}: {
  city: string;
  infoText: string;
  maxLength?: number;
  minLength?: number;
  setCity?: (city: string) => void;
}) {
  return (
    <Input
      iconName="user/location"
      infoText={infoText}
      inputName="City"
      maxLength={maxLength}
      minLength={minLength}
      placeholder="Moscow"
      setValue={setCity}
      type="text"
      value={city}
    />
  );
}
