import { DataTable } from "@/common/components/molecules/table/data-table";
import useCreateCase from "../../hooks/case/use-create-case";
import { FormProvider } from "react-hook-form";
import caseColumns from "./config/column.config";
import caseActionConfig from "./config/action.config";
import CreateCaseSheet from "@/common/components/organism/sheet/case/create-case-sheet";
import useFetchAllCases from "./hooks/use-fetch-all-cases";

export default function CasesPage() {
  const { form } = useCreateCase();
  const { data: result } = useFetchAllCases();

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-4xl font-bold">Cases</h3>
      </div>
      <FormProvider {...form}>
        <DataTable
          data={result.payload.data}
          columns={caseColumns}
          actions={caseActionConfig}
          createAction={<CreateCaseSheet />}
        />
      </FormProvider>
    </div>
  );
}
