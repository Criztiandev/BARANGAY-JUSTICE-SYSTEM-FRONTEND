import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/common/components/atoms/ui/sidebar";
import { SidebarBuilder } from "@/common/builder/sidebar-builder/partials/sidebar-builder";
import { SidebarConfig } from "@/common/builder/sidebar-builder/types";

interface Props {
  readonly config: SidebarConfig;
}

export function AppSidebar({ config }: Props) {
  return (
    <Sidebar collapsible="icon" className="overflow-hidden">
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <SidebarBuilder config={config} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
