import { TextArea } from "@/shared/ui/textarea";

interface DescriptionTextAreaProps {
  description: string;
  infoText: string;
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
  setDescription?: (description: string) => void;
}

export function DescriptionTextArea({
  description,
  infoText,
  maxLength,
  minLength,
  placeholder,
  setDescription,
}: DescriptionTextAreaProps) {
  return (
    <TextArea
      infoText={infoText}
      maxLength={maxLength}
      minLength={minLength}
      placeholder={placeholder}
      setValue={setDescription}
      textAreaName="Description"
      value={description}
    />
  );
}
