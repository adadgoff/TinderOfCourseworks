import styles from "./styles.module.scss";
import { SearchBar } from "@/shared/ui/search-bar";
import { Coursework as CourseworkModel } from "@/entities/coursework";
import { CourseworkPreview } from "@/widgets/coursework-preview";

export function Courseworks({
  courseworks,
}: {
  courseworks: CourseworkModel[];
}) {
  return (
    <article className={styles.courseworks}>
      {/* TODO: implement. */}
      {/* <SearchBar /> */}
      {courseworks.map((coursework) => (
        <CourseworkPreview coursework={coursework} key={coursework.id} />
      ))}
    </article>
  );
}
