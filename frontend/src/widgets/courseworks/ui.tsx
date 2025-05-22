import styles from "./styles.module.scss";
import { SearchBar } from "@/shared/ui/search-bar";
import { CourseworkPreview } from "@/widgets/coursework-preview";
import { Coursework } from "@/entities/types/coursework";
import { UserRole } from "@/entities/user/types";

export function Courseworks({
  courseworks,
  role,
}: {
  courseworks: Coursework[];
  role: UserRole;
}) {
  return (
    <article className={styles.courseworks}>
      {/* TODO: implement. */}
      {/* <SearchBar /> */}
      {courseworks.map((coursework) => (
        <CourseworkPreview
          coursework={coursework}
          key={coursework.id}
          href={`/${role}/courseworks/${coursework.id}/edit`}
        />
      ))}
    </article>
  );
}
