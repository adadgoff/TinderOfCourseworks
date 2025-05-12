import styles from "./styles.module.scss";
import { Icon } from "@/shared/ui/icon";
import Link from "next/link";
import { IconName } from "@/shared/ui/icon/types";
import clsx from "clsx";

export function MenuItem({
  isCurrentPage = false,
  hasNewNotification = false,
  href,
  iconName,
  title,
}: {
  isCurrentPage?: boolean;
  hasNewNotification?: boolean;
  href: string;
  iconName: IconName;
  title: string;
}) {
  const style = clsx(styles.menuItem, isCurrentPage && styles.currentPage);

  return (
    <div className={style}>
      <Link href={href}>
        <Icon name={iconName} size="s" />
        {title}
        {/*TODO: replace with Icon for good copying text on page.*/}
        {hasNewNotification && <span>●</span>}{" "}
      </Link>
    </div>
  );
}
