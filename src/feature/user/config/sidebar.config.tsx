import { MenuItem } from "@/common/components/organism/layout-bar/sidebar/types";
import { Files, Home, MessageCircle, User } from "lucide-react";

const userSidebarConfig: MenuItem[] = [
  {
    id: "home",
    title: "Home",
    icon: Home,
    href: "/",
  },
  {
    id: "cases",
    title: "Cases",
    icon: User,
    href: "/cases",
  },

  {
    id: "messages",
    title: "Messages",
    icon: MessageCircle,
    href: "/messages",
  },

  {
    id: "documents",
    title: "Documents",
    icon: Files,
    href: "/documents",
  },
  {
    id: "activity",
    title: "Activity",
    icon: User,
    href: "/activity",
  },
];

export default userSidebarConfig;
