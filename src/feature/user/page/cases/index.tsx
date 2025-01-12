import { DataTable } from "@/common/components/molecules/table/data-table";
import { columns, data, filterOptions } from "./columns";

export default function CasesPage() {
  const handleBulkDelete = (selectedRows: any[]) => {
    console.log("Bulk delete selected rows:", selectedRows);
  };

  const handleBulkEdit = (selectedRows: any[]) => {
    console.log("Bulk edit selected rows:", selectedRows);
  };

  return (
    <div className="container mx-auto py-10">
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
