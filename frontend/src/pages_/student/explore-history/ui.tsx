import { UserRole } from "@/entities/user/types";
import { ExploreHistory } from "@/widgets/explore-history";
import { InnerHeader } from "@/widgets/header-inner";

export function StudentExploreHistoryPage() {
  return (
    <>
      <InnerHeader title="Explore History" />
      <ExploreHistory role={UserRole.Student} />
    </>
  );
}
