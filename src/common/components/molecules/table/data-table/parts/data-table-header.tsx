import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/common/components/atoms/ui/table";
import { ArrowUpDown } from "lucide-react";
import { flexRender, HeaderGroup } from "@tanstack/react-table";

interface DataTableHeaderProps<TData, TValue> {
  readonly headerGroups: readonly HeaderGroup<TData>[];
}

function DataTableHeader<TData, TValue>({
  headerGroups,
}: Readonly<DataTableHeaderProps<TData, TValue>>) {
  return (
    <TableHeader>
      {headerGroups.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead
              key={header.id}
              onClick={header.column.getToggleSortingHandler()}
              className={
                header.column.getCanSort() ? "cursor-pointer select-none" : ""
              }
            >
              {!header.isPlaceholder && (
                <div className="flex items-center">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getCanSort() && (
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  )}
                </div>
              )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}

export default DataTableHeader;
