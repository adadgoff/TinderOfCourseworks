import {
  COURSEWORK_MAX_TITLE_LENGTH,
  COURSEWORK_MIN_TITLE_LENGTH,
} from "@/entities/coursework/consts";
import { Input } from "@/shared/ui/input";

export function TitleInput({
  title,
  setTitle,
}: {
  title: string;
  setTitle?: (title: string) => void;
}) {
  return (
    <Input
      infoText="Title of coursework."
      inputName="Title"
      maxLength={COURSEWORK_MAX_TITLE_LENGTH}
      minLength={COURSEWORK_MIN_TITLE_LENGTH}
      placeholder="best coursework title"
      setValue={setTitle}
      type="text"
      value={title}
    />
  );
}
