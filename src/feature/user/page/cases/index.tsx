import { DataTable } from "@/common/components/table/data-table";
import { columns } from "./columns";
import { toast } from "sonner";

type Case = {
  id: string;
  title: string;
  status: "open" | "closed" | "in_progress";
  gender: "male" | "female";
  createdAt: string;
};

export default function CasesPage() {
  const data: Case[] = [
    {
      id: "0",
      title: "Title Test",
      status: "closed",
      gender: "male",
      createdAt: new Date().toISOString(),
    },
  ];

  const onComplete = () => {
    toast("Event has been created", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  };

  const onEdit = (id: string) => {
    console.log(id);
  };

  const onDelete = (id: string) => {
    console.log(id);
  };

  const onBulkAction = (data: Case[]) => {
    console.log(data);
  };

  const filterableColumns = [
    {
      id: "title",
      label: "Title",
    },
    {
      id: "status",
      label: "Status",
      options: [
        { label: "Open", value: "open" },
        { label: "Closed", value: "closed" },
        { label: "In Progress", value: "in_progress" },
      ],
    },
    {
      id: "gender",
      label: "Gender",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
    },
    {
      id: "createdAt",
      label: "Created At",
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns({ onComplete, onEdit, onDelete })}
        data={data}
        filterableColumns={filterableColumns}
        onBulkAction={onBulkAction}
      />
    </div>
  );
}
