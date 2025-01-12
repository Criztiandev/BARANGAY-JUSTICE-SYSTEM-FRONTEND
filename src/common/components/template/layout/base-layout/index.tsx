import { Outlet } from "react-router-dom";
import SideBar, {
  SidebarGroup,
  SidebarMenuItem,
  SidebarCollapsibleMenuItem,
  SidebarSubMenuItem,
} from "../../../organism/layout-bar/sidebar";
import Topbar from "../../../organism/layout-bar/topbar";
import {
  SidebarMenu,
  SidebarProvider,
} from "@/common/components/atoms/ui/sidebar";
import { SidebarMenuItemType } from "../../../organism/layout-bar/sidebar/types";
import { MenuGroupType } from "../../../atoms/avatar/AvatarMenu";

interface BaseLayoutProps {
  menuGroups: MenuGroupType[];
  sidebarConfig: SidebarMenuItemType[];
}

const BaseLayout = ({ sidebarConfig, menuGroups }: BaseLayoutProps) => {
  const userRole = "admin"; // Example role

  const renderMenuItem = (item: SidebarMenuItemType) => {
    // Check if user has permission to see this item
    if (item.roles && !item.roles.includes(userRole)) {
      return null;
    }

    // Render item if it is a menu item
    if (item.type === "item") {
      return (
        <SidebarMenuItem
          key={item.href}
          href={item.href}
          title={item.title}
          icon={item.icon && <item.icon size={18} />}
        />
      );
    }

    // Render item if it is a collapsible menu item
    if (item.type === "collapsible") {
      return (
        <SidebarCollapsibleMenuItem
          key={item.title}
          title={item.title}
          icon={item.icon && <item.icon size={18} />}
        >
          <SidebarMenu>
            {item.children.map((subItem) => (
              <SidebarSubMenuItem
                key={subItem.href}
                title={subItem.title}
                href={subItem.href}
              />
            ))}
          </SidebarMenu>
        </SidebarCollapsibleMenuItem>
      );
    }

    return null;
  };

  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen w-full">
        <Topbar menuGroups={menuGroups} />
        <div className="flex flex-1 overflow-hidden  w-full">
          <SideBar className="h-full mt-[3.2rem]">
            <SidebarGroup label="Main menu">
              <SidebarMenu>{sidebarConfig.map(renderMenuItem)}</SidebarMenu>
            </SidebarGroup>
          </SideBar>
          <main className="flex-1 overflow-auto  p-4  pt-[4.2rem] w-full">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default BaseLayout;
