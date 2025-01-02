import { SidebarMenuItemType } from "@/common/components/layout/sidebar/types";
import { Home, User } from "lucide-react";

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
    title: "Files",
    href: "/Files",
    icon: User,
  },
  {
    type: "item",
    title: "History",
    href: "/History",
    icon: User,
  },
];

export default userSidebarConfig;
