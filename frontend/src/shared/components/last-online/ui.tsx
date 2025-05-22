"use client";

import styles from "./styles.module.scss";
import { formatDateTimeByLocale } from "@/shared/lib/date";
import { GreyP } from "@/shared/ui/p";

export function LastOnline({ lastOnline }: { lastOnline: /* Date */ string }) {
  return (
    <GreyP className={styles.lastOnline}>
      Last online:
      <br />
      {/* {formatDateTimeByLocale(lastOnline)} */}
      {lastOnline}
    </GreyP>
  );
}
