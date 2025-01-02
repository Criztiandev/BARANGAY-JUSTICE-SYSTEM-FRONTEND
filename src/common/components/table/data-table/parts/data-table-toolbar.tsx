import { Table } from "@tanstack/react-table";
import { Input } from "@/common/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/ui/select";
import { Button } from "@/common/components/ui/button";
import { Checkbox } from "@/common/components/ui/checkbox";
import React from "react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  columns: {
    id: string;
    label: string;
    options?: { label: string; value: string }[];
  }[];
  onBulkAction?: (selectedRows: TData[]) => void;
}

export function DataTableToolbar<TData>({
  table,
  columns,
  onBulkAction,
}: DataTableToolbarProps<TData>) {
  const [selectedColumn, setSelectedColumn] = React.useState(
    columns[0]?.id || ""
  );
  const selectedColumnDef = columns.find((col) => col.id === selectedColumn);

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-1 items-center space-x-2">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />

        {selectedColumnDef?.options ? (
          <Select
            value={
              (table.getColumn(selectedColumn)?.getFilterValue() as string) ??
              ""
            }
            onValueChange={(value) =>
              table.getColumn(selectedColumn)?.setFilterValue(value)
            }
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select value..." />
            </SelectTrigger>
            <SelectContent>
              {selectedColumnDef.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input
            placeholder="Filter..."
            value={
              (table.getColumn(selectedColumn)?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn(selectedColumn)
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        )}

        {table.getIsAllPageRowsSelected() && onBulkAction && (
          <Button
            variant="secondary"
            onClick={() =>
              onBulkAction(
                table.getSelectedRowModel().rows.map((row) => row.original)
              )
            }
          >
            Bulk Action
          </Button>
        )}
      </div>
      <Select
        value={selectedColumn}
        onValueChange={(value) => {
          table.getColumn(selectedColumn)?.setFilterValue("");
          setSelectedColumn(value);
        }}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Select column..." />
        </SelectTrigger>
        <SelectContent>
          {columns.map((column) => (
            <SelectItem key={column.id} value={column.id}>
              {column.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <DataTableViewOptions table={table} />
    </div>
  );
}
