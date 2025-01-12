import { DataTable } from "@/common/components/molecules/table/data-table";
import { createColumns, data, filterOptions } from "./columns";

export default function ActivityScreen() {
  const handleCreate = () => {
    console.log("Create");
  };

  const columns = createColumns({
    onView: (user) => console.log("View", user),
    onEdit: (user) => console.log("Edit", user),
    onDelete: (user) => console.log("Delete", user),
  });

  const handleBulkDelete = (selectedRows: any[]) => {
    console.log("Bulk delete selected rows:", selectedRows);
  };

  const handleBulkEdit = (selectedRows: any[]) => {
    console.log("Bulk edit selected rows:", selectedRows);
  };

  return (
    <div className="container mx-auto">
      <DataTable
        data={data}
        columns={columns}
        filterOptions={filterOptions}
        onBulkDelete={handleBulkDelete}
        onBulkEdit={handleBulkEdit}
      />
    </div>
  );
}
