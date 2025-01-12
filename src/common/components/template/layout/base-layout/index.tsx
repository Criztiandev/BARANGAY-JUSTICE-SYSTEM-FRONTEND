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

    // Return null if item is not a valid menu item
    return null;
  };

  return (
    <SidebarProvider>
      <div className="border w-full">
        <Topbar menuGroups={menuGroups} />
        <div className="border min-h-screen">
          <SideBar className=" h-[calc(100vh-3.2rem)] mt-[3.2rem]">
            <SidebarGroup label="Main menu">
              <SidebarMenu>{sidebarConfig.map(renderMenuItem)}</SidebarMenu>
            </SidebarGroup>
          </SideBar>
          <div className="w-full pt-[3.2rem] pl-[--sidebar-width]">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default BaseLayout;
