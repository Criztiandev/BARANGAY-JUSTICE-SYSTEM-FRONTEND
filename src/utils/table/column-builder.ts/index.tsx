import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Checkbox } from "@/common/components/atoms/ui/checkbox";

// Column builder function
const columnBuilder = <T extends object>(columns: ColumnDef<T>[]) => {
  const columnHelper = createColumnHelper<T>();

  return [
    // Checkbox column
    columnHelper.display({
      id: "checkbox",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value: any) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: any) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
    }),
    ...columns,
  ];
};

export default columnBuilder;
