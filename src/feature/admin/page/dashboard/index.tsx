import SideBar from "@/common/components/layout/sidebar";
import Topbar from "@/common/components/layout/topbar";
import { Button } from "@/common/components/ui/button";
import { SidebarContent, SidebarHeader } from "@/components/ui/sidebar";

import { Bell, Moon } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className=" min-h-screen">
      <Topbar>
        <Button size="icon" variant="ghost" className="opacity-60">
          <Bell size={18} />
        </Button>

        <Button size="icon" variant="ghost" className="opacity-60">
          <Moon size={18} />
        </Button>
      </Topbar>

      <div className="flex h-full">
        <SideBar>
          <SidebarHeader />
          <SidebarContent></SidebarContent>
        </SideBar>

        <div className=" w-full h-full flex ml-72 p-4"></div>
      </div>
    </div>
  );
};

export default AdminDashboard;
