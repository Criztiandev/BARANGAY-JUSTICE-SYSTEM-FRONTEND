import { useState } from "react";
import { MenuItem, isMenuBranch } from "./types";
import {
  SidebarMenu,
  SidebarMenuItem as SchadcnSidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarMenuSub,
} from "@/common/components/atoms/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/common/components/atoms/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/common/lib/utils";

interface NestedMenuItemProps {
  item: MenuItem;
  level?: number;
  userRole: string;
  active?: boolean;
}

export const NestedMenuItem = ({
  item,
  level = 0,
  userRole,
  active = false,
}: NestedMenuItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Check if current path matches item href or any child href
  const isActive =
    active ||
    location.pathname === (item as any).href ||
    (isMenuBranch(item) &&
      item.children.some((child) => location.pathname === (child as any).href));

  // Check role-based access
  if (item.roles && !item.roles.includes(userRole)) {
    return null;
  }

  if (isMenuBranch(item)) {
    // Auto-expand if a child is active
    const hasActiveChild = item.children.some(
      (child) => location.pathname === (child as any).href
    );
    if (hasActiveChild && !isOpen) {
      setIsOpen(true);
    }

    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <SchadcnSidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              className={cn(
                "w-full justify-between",
                level > 0 && `pl-${level * 4}`,
                isActive && "bg-primary/10 text-primary font-medium"
              )}
            >
              <span className="flex items-center">
                {item.icon && (
                  <span className={cn("mr-2", isActive && "text-primary")}>
                    <item.icon size={18} />
                  </span>
                )}
                {item.title}
              </span>
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.children.map((child) => (
                <NestedMenuItem
                  key={child.id}
                  item={child}
                  level={level + 1}
                  userRole={userRole}
                  active={location.pathname === (child as any).href}
                />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SchadcnSidebarMenuItem>
      </Collapsible>
    );
  }

  return (
    <SchadcnSidebarMenuItem>
      <SidebarMenuButton
        asChild
        className={cn(
          "w-full",
          level > 0 && `pl-${level * 4}`,
          isActive && "bg-primary/10 text-primary font-medium"
        )}
        isActive={isActive}
      >
        <Link to={item.href} className="flex items-center">
          {item.icon && (
            <span className={cn("mr-2", isActive && "text-primary")}>
              <item.icon size={18} />
            </span>
          )}
          <span className="text-base">{item.title}</span>
        </Link>
      </SidebarMenuButton>
      {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
    </SchadcnSidebarMenuItem>
  );
};

interface NestedSidebarProps {
  items: MenuItem[];
  userRole: string;
  className?: string;
}

export const NestedSidebar = ({
  items,
  userRole,
  className,
}: NestedSidebarProps) => {
  const location = useLocation();

  return (
    <SidebarMenu className={cn("mt-2", className)}>
      {items.map((item) => (
        <NestedMenuItem
          key={item.id}
          item={item}
          userRole={userRole}
          active={location.pathname === (item as any).href}
        />
      ))}
    </SidebarMenu>
  );
};
