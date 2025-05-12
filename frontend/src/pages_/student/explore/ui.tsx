import { UserRole } from "@/entities/user/types";
import { Explore } from "@/widgets/explore";
import { InnerHeader } from "@/widgets/header-inner";

export function StudentExplorePage() {
  return (
    <>
      <InnerHeader
        buttonDecor="grey"
        buttonText="history"
        href="/student/explore/history"
        iconName="common/history"
        openInNewTab={true}
        title="Explore"
      />
      <Explore role={UserRole.Student} />
    </>
  );
}
