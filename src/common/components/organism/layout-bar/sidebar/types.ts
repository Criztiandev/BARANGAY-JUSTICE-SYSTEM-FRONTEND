import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

// Base menu item interface
export interface BaseMenuItem {
  id: string;
  title: string;
  icon?: LucideIcon;
  roles?: string[];
  badge?: string | number;
  disabled?: boolean;
}

// Leaf menu item (no children)
export interface MenuLeafItem extends BaseMenuItem {
  href: string;
}

// Branch menu item (has children)
export interface MenuBranchItem extends BaseMenuItem {
  children: (MenuLeafItem | MenuBranchItem)[];
}

// Combined menu item type
export type MenuItem = MenuLeafItem | MenuBranchItem;

// Type guard to check if an item has children
export const isMenuBranch = (item: MenuItem): item is MenuBranchItem => {
  return "children" in item;
};

// Props for the NestedMenuItem component
export interface NestedMenuItemProps {
  item: MenuItem;
  level?: number;
  userRole: string;
  className?: string;
}

// Props for the NestedSidebar component
export interface NestedSidebarProps {
  items: MenuItem[];
  userRole: string;
  className?: string;
}

// Props for the BaseLayout component
export interface BaseLayoutProps {
  menuGroups: MenuGroupType[];
  sidebarConfig: MenuItem[];
}

// Group type for menu items
export interface MenuGroupType {
  id: string;
  label: string;
  icon?: ReactNode;
  items: MenuItem[];
}

// Role-based access control types
export type UserRole = "admin" | "user" | "guest";

// Expanded menu item type with active state
export type ActiveMenuItem = MenuItem & {
  isActive?: boolean;
  parentIds?: string[]; // For tracking parent-child relationships
};

// Sidebar context type
export interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
  activeItemId?: string;
  setActiveItemId: (id: string) => void;
}
