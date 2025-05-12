import { UserRole } from "@/entities/user/types";
import { Approves } from "@/widgets/approves";
import { InnerHeader } from "@/widgets/header-inner";

export function StudentApprovesPage() {
  return (
    <>
      <InnerHeader title="Approves" />
      <Approves role={UserRole.Student} />
    </>
  );
}
