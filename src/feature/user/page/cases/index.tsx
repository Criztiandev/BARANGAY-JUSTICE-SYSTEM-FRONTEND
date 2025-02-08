import { DataTable } from "@/common/components/molecules/table/data-table";
import useCreateCase from "../../hooks/case/use-create-case";
import { FormProvider } from "react-hook-form";
import caseColumns from "./config/column.config";
import caseActionConfig from "./config/action.config";
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

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-4xl font-bold">Cases</h3>
      </div>
      <FormProvider {...form}>
        <DataTable
          data={data}
          columns={caseColumns}
          actions={caseActionConfig}
        />
      </FormProvider>
    </div>
  );
}
