import { Outlet, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarGroup,
  SidebarProvider,
} from "@/common/components/atoms/ui/sidebar";
import { MenuItem } from "../../../organism/layout-bar/sidebar/types";
import { MenuGroupType } from "../../../atoms/avatar/AvatarMenu";
import Topbar from "../../../organism/layout-bar/topbar";
import { NestedSidebar } from "../../../organism/layout-bar/sidebar/index";
import { Input } from "@/common/components/atoms/ui/input";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/common/components/atoms/ui/breadcrumb";

interface BaseLayoutProps {
  menuGroups: MenuGroupType[];
  sidebarConfig: MenuItem[];
}

const BaseLayout = ({ sidebarConfig, menuGroups }: BaseLayoutProps) => {
  const userRole = "admin"; // Example role, you might want to get this from your auth context

  const location = useLocation();
  const pathname = location.pathname;

  const breadcrumbItems = pathname.split("/").filter(Boolean);

  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen w-full">
        <Topbar menuGroups={menuGroups} />
        <div className="flex flex-1 overflow-hidden w-full  ">
          <Sidebar className="h-full mt-[4.2rem] ">
            <div className="px-4 pt-4">
              <Input className="w-full" placeholder="Search" />
            </div>

            <SidebarGroup>
              <NestedSidebar items={sidebarConfig} userRole={userRole} />
            </SidebarGroup>
          </Sidebar>

          <main className="flex-1 overflow-auto p-4 pt-[4.2rem] mt-4 w-full">
            <div className="pl-12 pb-2">
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbItems.map((item) => (
                    <>
                      <BreadcrumbItem key={item}>
                        <BreadcrumbLink href={`/${item}`}>
                          {item}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                    </>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default BaseLayout;
