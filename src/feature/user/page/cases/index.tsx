import { DataTable } from "@/common/components/molecules/table/data-table";
import { CaseTableColumn, data, filterOptions } from "./columns";
import CreateCaseSheet from "@/common/components/organism/sheet/case/create-case-sheet";
import useCreateCase from "../../hooks/case/use-create-case";
import { FormProvider } from "react-hook-form";

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
          columns={CaseTableColumn}
          filterOptions={filterOptions}
          onBulkDelete={handleBulkDelete}
          onBulkEdit={handleBulkEdit}
          createButton={<CreateCaseSheet />}
        />
      </FormProvider>
    </div>
  );
}
