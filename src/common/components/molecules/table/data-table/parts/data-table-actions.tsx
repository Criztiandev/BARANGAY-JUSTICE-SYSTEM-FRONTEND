// components/DataTableActions.tsx
import { Button } from "@/common/components/atoms/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/common/components/atoms/ui/dropdown-menu";
import { Input } from "@/common/components/atoms/ui/input";
import { Filter, Search, Trash2, Edit } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { ReactNode } from "react";

interface DataTableActionsProps<TData> {
  table: Table<TData>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  selectedFilter: string;
  filterOptions: Array<{ label: string; value: string }>;
  handleFilterSelect: (value: string) => void;
  onBulkDelete?: (selectedRows: TData[]) => void;
  onBulkEdit?: (selectedRows: TData[]) => void;
  createButton?: ReactNode;
}

export function DataTableActions<TData>({
  table,
  globalFilter,
  setGlobalFilter,
  selectedFilter,
  filterOptions,
  handleFilterSelect,
  onBulkDelete,
  onBulkEdit,
  createButton,
}: DataTableActionsProps<TData>) {
  const selectedRows = table.getSelectedRowModel().rows;
  const hasSelectedRows = selectedRows.length > 0;

  return (
    <div className="flex justify-between items-center gap-4 mb-4">
      <div className="flex items-center gap-4">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search all columns..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-8"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-[120px]">
              <Filter className="mr-2 h-4 w-4" />
              {selectedFilter
                ? filterOptions.find((f) => f.value === selectedFilter)?.label
                : "All Cases"}
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
      </div>

      <div className="flex items-center gap-2">
        {createButton}

        {hasSelectedRows && (
          <div className="flex items-center gap-2">
            {onBulkEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  onBulkEdit(selectedRows.map((row) => row.original))
                }
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Selected
              </Button>
            )}
            {onBulkDelete && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() =>
                  onBulkDelete(selectedRows.map((row) => row.original))
                }
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
