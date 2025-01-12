import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
import { ArchiveCaseDialog } from "@/common/components/organism/dialog/case/archive-case-dialog";
import UpdateCaseSheet from "@/common/components/organism/sheet/case/update-case-sheet";

const CaseColumnActionCell = memo(function ActionsCell({
  caseData,
}: {
  caseData: any;
}) {
  const router = useNavigate();

  const handleCopyId = useCallback(() => {
    navigator.clipboard.writeText(caseData.id);
  }, [caseData.id]);

  const handleView = useCallback(() => {
    router(`/cases/${caseData.id}`);
  }, [router, caseData.id]);

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
        <DropdownMenuItem onClick={handleCopyId}>Copy case ID</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleView}>View</DropdownMenuItem>
        <DropdownMenuItem asChild>
          <UpdateCaseSheet
            caseId={caseData.id}
            className="w-full justify-start hover:bg-transparent hover:border-none hover:outline-none focus:bg-transparent focus:border-none focus:outline-none"
            variant="ghost"
          />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <ArchiveCaseDialog
            caseId={caseData.id}
            className="w-full justify-start hover:bg-transparent hover:border-none hover:outline-none focus:bg-transparent focus:border-none focus:outline-none"
            variant="ghost"
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export default CaseColumnActionCell;
