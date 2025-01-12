import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/common/components/atoms/ui/alert-dialog";
import { Button, ButtonProps } from "@/common/components/atoms/ui/button";

interface Props extends ButtonProps {
  caseId: string;
  label?: string;
}

export function ArchiveCaseDialog({ caseId, label, ...props }: Props) {
  console.log("caseId", caseId);

  const handleArchive = () => {
    console.log("Archive case", caseId);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button {...props}>{label || "Archive"}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleArchive}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
