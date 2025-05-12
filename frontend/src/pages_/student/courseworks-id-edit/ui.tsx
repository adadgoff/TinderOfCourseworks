"use client";

import { Coursework } from "@/entities/coursework";
import { notFound, useParams } from "next/navigation";
import { MOCK_COURSEWORKS } from "../../../../mocks/courseworks";
import { InnerHeader } from "@/widgets/header-inner";
import { CourseworkCreateEditForm } from "@/widgets/coursework-create-edit-form";

export function StudentCourseworksIdEditPage() {
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
      <InnerHeader title="Edit Coursework" />
      <CourseworkCreateEditForm coursework={coursework} mode="edit" />
    </>
  );
}
