import { ReactNode } from "react";

// Basic Types
export type DefaultActionType = "button";
export type BulkActionType =
  | "delete"
  | "update"
  | "export"
  | "archive"
  | "custom";

// Filter Types
export type FilterOptionItem = {
  label: string;
  value: any;
};

export type FilterField = {
  field: string;
  label: string;
  options: FilterOptionItem[];
};

export type FilterConfig<T> = {
  id?: string;
  className?: string;
  hidden?: boolean;
  field?: keyof T;
  options?: FilterOptionItem[];
  groups?: FilterField[];
  onChange?: (field: keyof T | string, value: any) => void;
};

// Search Types
export type SearchConfig = {
  id?: string;
  placeholder?: string;
  className?: string;
  hidden?: boolean;
  onChange?: (value: string) => void;
};

// Action Types
interface BaseActionProps<T> {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  hidden?: boolean;
  onClick: (data?: T[]) => void | Promise<void>;
}

export interface DefaultAction<T> extends BaseActionProps<T> {
  type: DefaultActionType;
  variant?: "default" | "destructive" | "outline";
}

export interface CustomAction<T> extends BaseActionProps<T> {
  type: "custom";
  component: ReactNode;
}

export type MoreAction<T> = DefaultAction<T> | CustomAction<T>;

export interface BulkAction<T> {
  id: string;
  type: BulkActionType;
  label: string;
  icon?: ReactNode;
  variant?: "default" | "destructive" | "outline";
  disabled?: boolean;
  hidden?: boolean;
  component?: ReactNode;
  onClick: (selectedItems: T[]) => void | Promise<void>;
  confirmationRequired?: boolean;
  confirmationMessage?: string;
}

// Configuration Types
export type MoreActionsConfig<T> = {
  id?: string;
  className?: string;
  hidden?: boolean;
  placement?: "top" | "bottom" | "left" | "right";
  trigger?: ReactNode;
  actions: MoreAction<T>[];
};

export type BulkActionsConfig<T> = {
  id?: string;
  className?: string;
  hidden?: boolean;
  placement?: "top" | "bottom" | "left" | "right";
  actions: BulkAction<T>[];
};

// Main Configuration Type
export type ActionConfig<T> = {
  search?: SearchConfig;
  filter?: FilterConfig<T>;
  moreActions?: MoreActionsConfig<T>;
  bulkActions?: BulkActionsConfig<T>;
};
