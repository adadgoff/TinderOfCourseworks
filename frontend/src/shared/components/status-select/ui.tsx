import { COURSEWORK_STATUSES } from "@/entities/coursework/consts";
import { CourseworkStatus } from "@/entities/coursework/types";
import { Select } from "@/shared/ui/select";

export function StatusSelect({
  currentStatus,
  disabledStatuses,
  setCurrentStatus,
}: {
  currentStatus: CourseworkStatus;
  disabledStatuses?: CourseworkStatus[];
  setCurrentStatus?: (status: string) => void;
}) {
  return (
    <Select
      currentOption={currentStatus}
      disabledOptions={disabledStatuses}
      infoText="Status of coursework."
      options={COURSEWORK_STATUSES}
      selectName="Status"
      setCurrentOption={setCurrentStatus}
    />
  );
}
