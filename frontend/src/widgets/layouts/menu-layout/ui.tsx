"use client";

import styles from "./styles.module.scss";
import { UserRole } from "@/entities/user/types";
import { usePathname } from "next/navigation";
import { IconName } from "@/shared/ui/icon/types";
import { GreyHr } from "@/shared/ui/hr";
import { Pill } from "./ui/pill";
import { MenuItem } from "./ui/menu-item";
import { ReactNode } from "react";
import { GreyVr } from "@/shared/ui/vr";

const MENU_ITEMS: {
  path: string;
  iconName: IconName;
  title: string;
}[] = [
  {
    path: "courseworks",
    iconName: "menu/courseworks",
    title: "My courseworks",
  },
  { path: "explore", iconName: "menu/explore", title: "Explore" },
  { path: "matches", iconName: "menu/matches", title: "Matches" },
  { path: "approves", iconName: "menu/approves", title: "Approves" },
  { path: "profile", iconName: "menu/profile", title: "Profile" },
];

export function MenuLayout({
  children,
  role,
}: {
  children: ReactNode;
  role: UserRole;
}) {
  const pathName = usePathname();

  return (
    <div className={styles.content}>
      <aside className={styles.sidebar}>
        <Pill role={role} />
        <GreyHr />
        <nav className={styles.navbar}>
          {MENU_ITEMS.map((item) => (
            <MenuItem
              key={item.path}
              isCurrentPage={pathName.includes(item.path)}
              href={`/${role}/${item.path}`}
              iconName={item.iconName}
              title={item.title}
            />
          ))}
        </nav>
      </aside>
      <GreyVr />
      {children}
    </div>
  );
}
