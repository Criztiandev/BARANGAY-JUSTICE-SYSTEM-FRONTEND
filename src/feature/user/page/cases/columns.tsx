"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/common/components/atoms/ui/checkbox";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/common/components/atoms/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/components/atoms/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/atoms/ui/dialog";
import { Label } from "@/common/components/atoms/ui/label";
import { useState } from "react";
import UpdateCaseSheet from "@/common/components/organism/sheet/case/update-case-sheet";
import { ArchiveCaseDialog } from "@/common/components/organism/dialog/case/archive-case-dialog";
import { Link } from "react-router-dom";

interface Case {
  id: string;
  caseNumber: string;
  caseType: string;
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
    caseType: "Civil Cases",
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
    caseType: "Criminal Cases",
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

interface ColumnProps {
  onView?: (caseData: Case) => void;
  onEdit?: (caseData: Case) => void;
  onDelete?: (caseData: Case) => void;
}

export const createColumns = ({
  onView,
  onEdit,
  onDelete,
}: ColumnProps): ColumnDef<Case>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
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
    cell: ({ row }) => {
      const caseData = row.original;
      return <Link to={`./${caseData.id}`}>{caseData.caseNumber}</Link>;
    },
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
    cell: ({ row }) => {
      const caseData = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(caseData.id)}
            >
              Copy case ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onView?.(caseData)}
              className="font-semibold"
            >
              View
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <UpdateCaseSheet
                caseId={caseData.id}
                variant="ghost"
                label="Update"
                className="p-0 w-full text-start justify-start px-2"
              />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <ArchiveCaseDialog
                caseId={caseData.id}
                variant="ghost"
                label="Delete"
                className="p-0 w-full text-start justify-start px-2"
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
