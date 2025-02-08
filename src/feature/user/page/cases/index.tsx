import { DataTable } from "@/common/components/molecules/table/data-table";
import CreateCaseSheet from "@/common/components/organism/sheet/case/create-case-sheet";
import useCreateCase from "../../hooks/case/use-create-case";
import { FormProvider } from "react-hook-form";
import { filterOptions } from "../documents/columns";
import caseColumns from "../../config/table.config";

export const data: any[] = [
  {
    id: "1",
    caseNumber: "#2332",
    caseType: "Civil",
    filingDate: "2024-01-01",
    status: "Active",
    actions: "Actions",
  },
  {
    id: "2",
    caseNumber: "#2432",
    caseType: "Not Civil",
    filingDate: "2024-01-01",
    status: "Active",
  },
];

export default function CasesPage() {
  const { form } = useCreateCase();

  const handleBulkDelete = (selectedRows: any[]) => {
    console.log("Bulk delete selected rows:", selectedRows);
  };

  const handleBulkEdit = (selectedRows: any[]) => {
    console.log("Bulk edit selected rows:", selectedRows);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-4xl font-bold">Cases</h3>
      </div>
      <FormProvider {...form}>
        <DataTable
          data={data}
          columns={caseColumns}
          filterOptions={filterOptions}
          onBulkDelete={handleBulkDelete}
          onBulkEdit={handleBulkEdit}
          createButton={<CreateCaseSheet />}
        />
      </FormProvider>
    </div>
  );
}
