"use client";

import { ColumnDef, Row, Table } from "@tanstack/react-table";
import { useMemo } from "react";
import CaseColumnActionCell from "@/common/components/molecules/table/case/cells/case-column-action-cell";
import { Checkbox } from "@/common/components/atoms/ui/checkbox";
import { Link } from "react-router-dom";

interface Case {
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

export const data: Case[] = [
  {
    id: "1",
    caseNumber: "CASE-2024-001",
    caseType: "civilCases",
    civilCaseType: "UTANG O PAG KAKAUTANG",
    filingDate: "2024-01-15",
    caseDescription: "Sample civil case description",
    compliantName: "John Doe",
    compliantEmail: "john@example.com",
    respondentName: "Jane Smith",
    respondentEmail: "jane@example.com",
  },
  {
    id: "2",
    caseNumber: "CASE-2024-002",
    caseType: "criminalCases",
    criminalCaseType: "THREATS",
    filingDate: "2024-01-16",
    caseDescription: "Sample criminal case description",
    compliantName: "Bob Wilson",
    compliantEmail: "bob@example.com",
    respondentName: "Alice Brown",
    respondentEmail: "alice@example.com",
  },
];

export const filterOptions = [
  { label: "All", value: "" },
  { label: "Civil Cases", value: "civilCases" },
  { label: "Criminal Cases", value: "criminalCases" },
];

export const createColumns = (): ColumnDef<Case>[] => {
  const columns = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }: { table: Table<Case> }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }: { row: Row<Case> }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
      },
      {
        accessorKey: "caseNumber",
        header: "Case Number",
        cell: ({ row }: { row: Row<Case> }) => (
          <Link to={`/cases/${row.original.id}`}>
            <span className="font-semibold hover:underline">
              {row.original.caseNumber}
            </span>
          </Link>
        ),
      },
      {
        accessorKey: "caseType",
        header: "Case Type",
      },
      {
        accessorKey: "filingDate",
        header: "Filing Date",
      },
      {
        id: "actions",
        cell: ({ row }: { row: Row<Case> }) => (
          <CaseColumnActionCell caseData={row.original} />
        ),
      },
    ],
    []
  );

  return columns;
};
