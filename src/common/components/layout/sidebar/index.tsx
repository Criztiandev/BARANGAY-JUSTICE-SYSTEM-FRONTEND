import { PropsWithChildren, ReactNode, useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup as SchadCnSidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem as SchadcnSidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuBadge,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/common/lib/utils";

interface Props extends PropsWithChildren {
  className?: string;
}
const SideBar = ({ className, children }: Props) => {
  return (
    <Sidebar className={cn("w-[--sidebar-width]", className)}>
      <SidebarContent>{children}</SidebarContent>
    </Sidebar>
  );
};

interface SidebarItemProps {
  title: string;
  dir?: "left" | "right";
  href: string;
  icon: ReactNode;
  badge?: string;
  isActive?: boolean;
}

export const SidebarMenuItem = ({
  title,
  dir = "left",
  icon,
  href,
  badge,
  isActive,
}: SidebarItemProps) => {
  return (
    <SchadcnSidebarMenuItem>
      <SidebarMenuButton
        asChild
        variant="default"
        size="default"
        className={cn(`${isActive && "bg-primary text-primary-foreground"}`)}
      >
        <Link to={href} className="flex">
          {dir === "left" && icon}
          <span>{title}</span>
          {dir === "right" && icon}
        </Link>
      </SidebarMenuButton>
      {badge && <SidebarMenuBadge>{badge}</SidebarMenuBadge>}
    </SchadcnSidebarMenuItem>
  );
};

interface SidebarCollapsibleMenuItemProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function SidebarCollapsibleMenuItem({
  title,
  icon,
  children,
}: SidebarCollapsibleMenuItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <SchadcnSidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className="w-full justify-between">
            <span className="flex items-center">
              {icon && <span className="mr-2">{icon}</span>}
              {title}
            </span>
            {open ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>{children}</SidebarMenuSub>
        </CollapsibleContent>
      </SchadcnSidebarMenuItem>
    </Collapsible>
  );
}

interface SidebarSubMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof SidebarMenuSubItem> {
  title: string;
  href: string;
  isActive?: boolean;
}

export function SidebarSubMenuItem({
  title,
  href,
  isActive,
  ...props
}: SidebarSubMenuItemProps) {
  return (
    <SidebarMenuSubItem {...props}>
      <SidebarMenuButton
        asChild
        data-active={isActive}
        className={cn(
          "w-full justify-start",
          isActive && "bg-primary text-primary-foreground"
        )}
      >
        <Link to={href}>{title}</Link>
      </SidebarMenuButton>
    </SidebarMenuSubItem>
  );
}

/**
 * Groups
 */

interface SidebarGroupProps extends PropsWithChildren {
  label: string;
}

export const SidebarGroup = ({ children, label }: SidebarGroupProps) => {
  return (
    <SchadCnSidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>{children}</SidebarGroupContent>
    </SchadCnSidebarGroup>
  );
};

export const SidebarCollapsableGroup = ({
  children,
  label,
}: SidebarGroupProps) => {
  return (
    <Collapsible>
      <SchadCnSidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            <span>{label}</span>
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>{children}</SidebarGroupContent>
        </CollapsibleContent>
      </SchadCnSidebarGroup>
    </Collapsible>
  );
};

export default SideBar;
