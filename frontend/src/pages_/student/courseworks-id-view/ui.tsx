"use client";

import { Coursework } from "@/entities/coursework";
import { notFound, useParams } from "next/navigation";
import { MOCK_COURSEWORKS } from "../../../../mocks/courseworks";
import { InnerHeader } from "@/widgets/header-inner";
import { CourseworkView } from "@/widgets/coursework-view";

export function StudentCourseworksIdViewPage() {
  const params = useParams();
  const { id } = params;

  const coursework: Coursework | undefined = MOCK_COURSEWORKS.find(
    (coursework) => coursework.id === id,
  );

  if (coursework === undefined) {
    notFound();
  }

  return (
    <>
      <InnerHeader title="View Coursework" />
      <CourseworkView coursework={coursework} />
    </>
  );
}
