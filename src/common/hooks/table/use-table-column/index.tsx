import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

// types.ts
export interface ColumnConfig<T> {
  id: string;
  accessorKey?: keyof T;
  header: string | ((props: any) => React.ReactNode);
  cell?: (props: any) => React.ReactNode;
  enableSorting?: boolean;
  enableGlobalFilter?: boolean;
}

export function useTableColumns<T>(columns: ColumnConfig<T>[]): ColumnDef<T>[] {
  return columns.map((column) => ({
    id: column.id,
    accessorKey: column.accessorKey,
    header: ({ column: tableColumn }) => {
      if (typeof column.header === "function") {
        return column.header({ column: tableColumn });
      }

      return (
        <div className="flex items-center">
          {column.header}
          {column.enableSorting && (
            <ArrowUpDown className="ml-2 h-4 w-4 cursor-pointer" />
          )}
        </div>
      );
    },
    cell: column.cell,
    enableSorting: column.enableSorting ?? true,
    enableGlobalFilter: column.enableGlobalFilter ?? true,
  }));
}

// Builder for the table columns
