import { DataTable } from "@/common/components/molecules/table/data-table";
import { createColumns, data, filterOptions } from "./columns";
import { XStack } from "@/common/components/atoms/ui/stack";
import { Separator } from "@/common/components/atoms/ui/separator";
import DocumentFolderCard from "@/common/components/molecules/card/document-folder-card";

export default function UserDocumentScreen() {
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
    <div className=" mx-auto">
      <div>
        <XStack className="mb-4 justify-between">
          <span className="text-2xl font-bold">Recent Documents</span>
        </XStack>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <DocumentFolderCard title="Form 137" to="./1" />
          <DocumentFolderCard to="/2" />
          <DocumentFolderCard to="/3" />
          <DocumentFolderCard to="/4" />
        </div>
      </div>

      <Separator className="my-4" />
      <div>
        <DataTable
          data={data}
          columns={columns}
          filterOptions={filterOptions}
          onBulkDelete={handleBulkDelete}
          onBulkEdit={handleBulkEdit}
        />
      </div>
    </div>
  );
}
