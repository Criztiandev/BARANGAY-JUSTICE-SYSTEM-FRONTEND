import { LucideIcon } from "lucide-react";

export type Role = "admin" | "user" | "manager";

export interface BaseMenuItem {
  title: string;
  icon?: LucideIcon;
  roles?: Role[];
}

export interface MenuItem extends BaseMenuItem {
  type: "item";
  href: string;
}

export interface SubMenuItem extends BaseMenuItem {
  type: "sub";
  href: string;
}

export interface CollapsibleMenuItem extends BaseMenuItem {
  type: "collapsible";
  children: (MenuItem | SubMenuItem)[];
}

export type SidebarMenuItemType = MenuItem | CollapsibleMenuItem;
