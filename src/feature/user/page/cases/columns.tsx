import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Check, Edit, Trash } from "lucide-react";

type Case = {
  id: string;
  title: string;
  status: "open" | "closed" | "in_progress";
  createdAt: string;
  gender: "male" | "female";
};

interface CaseActionsProps {
  onComplete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const columns = ({
  onComplete,
  onEdit,
  onDelete,
}: CaseActionsProps): ColumnDef<Case>[] => [
  {
    accessorKey: "id",
    header: "Case ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.original.id;

      return (
        <div className="space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onComplete?.(id)}
          >
            <Check />
          </Button>
          <Button variant="outline" size="icon" onClick={() => onEdit?.(id)}>
            <Edit />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => onDelete?.(id)}
          >
            <Trash />
          </Button>
        </div>
      );
    },
  },
];
