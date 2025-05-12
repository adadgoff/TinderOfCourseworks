import { UserRole } from "@/entities/user/types";
import { InnerHeader } from "@/widgets/header-inner";
import { MatchesHistory } from "@/widgets/matches-history";

export function StudentMatchesHistoryPage() {
  return (
    <>
      <InnerHeader title="Matches History" />
      <MatchesHistory role={UserRole.Student} />
    </>
  );
}
