import { createSidebarHelper } from "@/common/builder/sidebar-builder";
import { FileText, GitGraph } from "lucide-react";

const sidebarHelper = createSidebarHelper();

const sidebarConfig = sidebarHelper.createSection({
  id: "home",
  title: "Home",
  items: [
    {
      type: "single",
      title: "Home",
      href: "/",
      icon: GitGraph,
    },
    {
      type: "single",
      title: "My Cases",
      href: "/cases",
      icon: FileText,
    },
  ],
});

export default sidebarConfig;
