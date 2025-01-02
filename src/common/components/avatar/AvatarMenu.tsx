import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu";
import Avatar from "./Avatar";
import React from "react";
import { Link } from "react-router-dom";

interface MenuItemType {
  label: string;
  shortcut?: string;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
}

export interface MenuGroupType {
  label?: string;
  items: MenuItemType[];
}

export interface AvatarMenuProps {
  avatarSrc?: string;
  avatarFallback?: string;
  menuGroups: MenuGroupType[];
}

const AvatarMenu = ({
  avatarSrc = "https://github.com/shadcn.png",
  avatarFallback = "CN",
  menuGroups,
}: AvatarMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar src={avatarSrc} fallback={avatarFallback} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" side="bottom">
        {menuGroups.map((group, groupIndex) => (
          <React.Fragment key={groupIndex}>
            {group.label && (
              <>
                <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuGroup>
              {group.items.map((item, itemIndex) => (
                <Link to={item.href || ""} key={itemIndex}>
                  <DropdownMenuItem
                    key={itemIndex}
                    disabled={item.disabled}
                    onClick={item.onClick}
                  >
                    {item.label}
                    {item.shortcut && (
                      <DropdownMenuShortcut>
                        {item.shortcut}
                      </DropdownMenuShortcut>
                    )}
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuGroup>
            {groupIndex < menuGroups.length - 1 && <DropdownMenuSeparator />}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarMenu;
