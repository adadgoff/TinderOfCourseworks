import { UserRole } from "@/entities/user/types";
import { InnerHeader } from "@/widgets/header-inner";
import { Matches } from "@/widgets/matches";

export function StudentMatchesPage() {
  return (
    <>
      <InnerHeader
        buttonDecor="grey"
        buttonText="history"
        href="/student/matches/history"
        iconName="common/history"
        openInNewTab={true}
        title="Matches"
      />
      <Matches role={UserRole.Student} />
    </>
  );
}
