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
import { LogOutIcon } from "lucide-react";
import { memo, useCallback } from "react";

interface Props extends ButtonProps {
  label?: string;
}

export const LogoutDialog = memo(function LogoutDialog({ label }: Props) {
  const handleLogout = useCallback(() => {
    console.log("Logout");
  }, []);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <LogOutIcon className="w-4 h-4" />
          {label ?? "Logout"}
        </Button>
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
          <AlertDialogAction onClick={handleLogout}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});
