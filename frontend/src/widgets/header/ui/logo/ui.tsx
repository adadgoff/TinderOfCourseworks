import Link from "next/link";

import styles from "./styles.module.scss";
import { Icon } from "@/shared/ui/icon";

export function Logo({
  href,
}: {
  href: string; // TODO: from string to url.
}) {
  return (
    <Link href={href}>
      <div className={styles.logo}>
        {/* TODO: trim the logo properly and fix sizes. */}
        <Icon name="header/icon" size="l" />
        Tinder of Courseworks
      </div>
    </Link>
  );
}
