import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/common/components/atoms/ui/sidebar";
import { SidebarBuilder } from "@/common/builder/sidebar-builder/partials/sidebar-builder";
import { SidebarConfig } from "@/common/builder/sidebar-builder/types";
import SettingsMenuBuilder from "@/common/builder/settings-menu-builder/partials/setting-menu-builder";
import { ChevronsUpDown } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/common/components/atoms/ui/avatar";

interface Props {
  readonly sidebarConfig: SidebarConfig;
  readonly menuConfig: MenuItemConfig[];
}

export function AppSidebar({ sidebarConfig, menuConfig }: Props) {
  console.log("AppSidebar", sidebarConfig);

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://github.com/shadcn.png",
  };

  return (
    <Sidebar collapsible="icon" className="overflow-hidden">
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <SidebarBuilder config={sidebarConfig} />
      </SidebarContent>
      <SidebarFooter>
        <SettingsMenuBuilder
          trigger={
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          }
          side="right"
          items={menuConfig}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
