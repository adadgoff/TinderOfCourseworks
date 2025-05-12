import { Coursework } from "@/entities/coursework";
import { Courseworks } from "@/widgets/courseworks";
import { MOCK_COURSEWORKS } from "../../../../mocks/courseworks";
import { InnerHeader } from "@/widgets/header-inner";

export function StudentCourseworksPage() {
  const courseworks: Coursework[] = MOCK_COURSEWORKS;

  return (
    <>
      <InnerHeader
        buttonDecor="accent"
        buttonText="create coursework"
        href="/student/courseworks/create"
        iconName="courseworks/plus"
        openInNewTab={true}
        title="Courseworks"
      />
      <Courseworks courseworks={courseworks} />
    </>
  );
}
