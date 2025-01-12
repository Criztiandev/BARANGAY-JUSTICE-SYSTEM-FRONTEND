import { SidebarMenuItemType } from "@/common/components/organism/layout-bar/sidebar/types";
import { Files, Home, User } from "lucide-react";

const userSidebarConfig: SidebarMenuItemType[] = [
  {
    type: "item",
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    type: "item",
    title: "Cases",
    href: "/cases",
    icon: User,
  },
  {
    type: "item",
    title: "Documents",
    href: "/documents",
    icon: Files,
  },
  {
    type: "item",
    title: "Activity",
    href: "/activity",
    icon: User,
  },
];

export default userSidebarConfig;
