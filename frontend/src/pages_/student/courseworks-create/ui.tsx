import { InnerHeader } from "@/widgets/header-inner";
import { CourseworkCreateEditForm } from "@/widgets/coursework-create-edit-form";

export function StudentCourseworksCreatePage() {
  return (
    <>
      <InnerHeader title="Create Coursework" />
      <CourseworkCreateEditForm mode="create" />
    </>
  );
}
