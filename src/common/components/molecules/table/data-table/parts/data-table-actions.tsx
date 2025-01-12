import { Button } from "@/common/components/atoms/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/common/components/atoms/ui/dropdown-menu";
import { Input } from "@/common/components/atoms/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/atoms/ui/select";
import { ChevronDown, Filter, Plus, Search } from "lucide-react";
import { Table } from "@tanstack/react-table";

interface DataTableActionsProps<TData> {
  table: Table<TData>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  selectedFilter: string;
  filterOptions: Array<{ label: string; value: string }>;
  handleFilterSelect: (value: string) => void;
  onBulkDelete?: (selectedRows: TData[]) => void;
  onBulkEdit?: (selectedRows: TData[]) => void;
  handleBulkAction: (action: "delete" | "edit") => void;
  onCreate?: () => void;
}

export function DataTableActions<TData>({
  globalFilter,
  setGlobalFilter,
  selectedFilter,
  filterOptions,
  handleFilterSelect,
  onBulkDelete,
  onBulkEdit,
  handleBulkAction,
  onCreate,
}: DataTableActionsProps<TData>) {
  return (
    <div className="flex justify-between items-center">
      <div className="relative w-72">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="pl-8"
        />
      </div>
      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              {selectedFilter || "Filter"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {filterOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onSelect={() => handleFilterSelect(option.value)}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Actions
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {onBulkDelete && (
              <DropdownMenuItem onSelect={() => handleBulkAction("delete")}>
                Bulk Delete
              </DropdownMenuItem>
            )}
            {onBulkEdit && (
              <DropdownMenuItem onSelect={() => handleBulkAction("edit")}>
                Bulk Edit
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        {onCreate && (
          <Button onClick={onCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Create
          </Button>
        )}
      </div>
    </div>
  );
}
