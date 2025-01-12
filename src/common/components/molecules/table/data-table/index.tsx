import { ReactNode, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  RowSelectionState,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/common/components/atoms/ui/table";

import { ArrowUpDown } from "lucide-react";
import DataTablePagination from "./parts/data-table-pagination";
import { DataTableActions } from "./parts/data-table-actions";

export interface DataTableFilterOption {
  label: string;
  value: string;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterOptions: DataTableFilterOption[];
  onBulkDelete?: (selectedRows: TData[]) => void;
  onBulkEdit?: (selectedRows: TData[]) => void;
  createButton?: ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterOptions,
  onBulkDelete,
  onBulkEdit,
  createButton,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageSize, setPageSize] = useState(10);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    state: {
      globalFilter,
      rowSelection,
      sorting,
      pagination: {
        pageSize,
        pageIndex: 0,
      },
    },
  });

  const handleBulkAction = (action: "delete" | "edit") => {
    const selectedRows = table
      .getSelectedRowModel()
      .rows.map((row) => row.original);
    if (action === "delete" && onBulkDelete) {
      onBulkDelete(selectedRows);
    } else if (action === "edit" && onBulkEdit) {
      onBulkEdit(selectedRows);
    }

    table.resetRowSelection();
  };

  const handleFilterSelect = (value: string) => {
    setSelectedFilter(value);
    setGlobalFilter(value);
  };

  const exportedActions = {
    table,
    globalFilter,
    setGlobalFilter,
    pageSize,
    setPageSize,
    selectedFilter,
    filterOptions,
    handleFilterSelect,
    onBulkDelete,
    onBulkEdit,
    handleBulkAction,
    createButton,
  };

  return (
    <div className="space-y-4">
      <DataTableActions {...exportedActions} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className={
                      header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : ""
                    }
                  >
                    {header.isPlaceholder ? null : (
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
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        currentPage={table.getState().pagination.pageIndex + 1}
        totalPages={table.getPageCount()}
      />
    </div>
  );
}
