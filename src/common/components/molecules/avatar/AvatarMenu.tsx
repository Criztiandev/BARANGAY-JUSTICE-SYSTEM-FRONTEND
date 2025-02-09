import { Button } from "@/common/components/atoms/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/common/components/atoms/ui/dropdown-menu";
import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "../../atoms/ui/avatar";

interface MenuItemType {
  label: string;
  shortcut?: string;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
}

export interface AvatarMenuGroupType {
  label?: string;
  items: MenuItemType[];
}

export interface AvatarMenuProps {
  avatarSrc?: string;
  avatarFallback?: string;
  menuGroups: AvatarMenuGroupType[];
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
          <React.Fragment key={group.label}>
            {group.label && (
              <>
                <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuGroup>
              {group.items.map((item) => (
                <Link to={item.href ?? ""} key={item.label}>
                  <DropdownMenuItem
                    key={item.label}
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
