export interface Case {
  id: string;
  caseNumber: string;
  caseType: "civilCases" | "criminalCases";
  civilCaseType?: string;
  criminalCaseType?: string;
  filingDate: string;
  caseDescription: string;
  compliantName: string;
  compliantEmail: string;
  respondentName: string;
  respondentEmail: string;
}
