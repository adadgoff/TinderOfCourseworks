interface IconMap {
  common:
    | "arrow-down"
    | "cross"
    | "edit"
    | "history"
    | "like"
    | "search"
    | "sort";
  courseworks: "approved" | "back" | "cancelled" | "matching" | "plus";
  header: "icon";
  main:
    | "compass"
    | "communicate"
    | "handshake"
    | "student"
    | "success"
    | "supervisor";
  menu: "approves" | "courseworks" | "explore" | "matches" | "pill" | "profile";
  social: "discord" | "mail" | "telegram" | "vkontakte";
  theme: "dark" | "light";
  user: "birthday" | "location";
}

export type IconSize = "xs" | "s" | "m" | "l" | "xl";

export type IconName = {
  [Key in keyof IconMap]: `${Key}/${IconMap[Key]}`;
}[keyof IconMap];
