import { ChevronsUpDown, Settings, User } from "lucide-react";
import createSettingsMenuHelper from "@/common/builder/settings-menu-builder";
import {
  AvatarImage,
  AvatarFallback,
  Avatar,
} from "@/common/components/atoms/ui/avatar";
import { SidebarMenuButton } from "@/common/components/atoms/ui/sidebar";
import { LogoutDialog } from "@/common/components/organism/dialog/account/logout-dialog";

const helper = createSettingsMenuHelper();

const menuConfig = [
  helper.createLabel({
    component: (
      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      >
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src={""} alt={"user"} />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">John Doe</span>
          <span className="truncate text-xs">john.doe@example.com</span>
        </div>
      </SidebarMenuButton>
    ),
  }),
  helper.createSeparator(),
  helper.createGroup([
    helper.createLink({
      title: "Account",
      icon: User,
      href: "/account",
    }),
    helper.createLink({
      title: "Settings",
      icon: Settings,
      href: "/settings",
    }),
  ]),
  helper.createSeparator(),
  helper.createLabel({
    component: <LogoutDialog />,
  }),
];
export default menuConfig;
