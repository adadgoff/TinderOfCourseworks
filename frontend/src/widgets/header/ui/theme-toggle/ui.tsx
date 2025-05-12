"use client";

import { Button } from "@/shared/ui/button";
import { Icon } from "@/shared/ui/icon";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button onClick={() => setTheme(theme !== "light" ? "light" : "dark")}>
      {theme !== "light" ? (
        <Icon name="theme/light" />
      ) : (
        <Icon name="theme/dark" />
      )}
    </Button>
  );
}
