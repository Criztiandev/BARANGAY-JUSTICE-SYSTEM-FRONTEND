import React, { useState } from "react";
import { Button } from "@/common/components/atoms/ui/button";
import { EyeIcon, Pencil, Trash, Download, MoreVertical } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/common/components/atoms/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/common/components/atoms/ui/dropdown-menu";

interface Action {
  id: string;
  icon?: React.ReactNode;
  title?: string;
  component?: React.ReactNode;
  onClick?: () => void;
  showModal?: boolean;
  modalContent?: React.ReactNode;
  isStashed?: boolean;
}

interface ActionColumnProps {
  actions?: Action[];
  defaultActions?: {
    view?: {
      component?: React.ReactNode;
      onClick?: () => void;
      isStashed?: boolean;
    };
    edit?: {
      component?: React.ReactNode;
      onClick?: () => void;
      isStashed?: boolean;
    };
    delete?: {
      component?: React.ReactNode;
      onClick?: () => void;
      isStashed?: boolean;
    };
  };
}

const DEFAULT_ICONS = {
  view: <EyeIcon className="h-4 w-4" />,
  edit: <Pencil className="h-4 w-4" />,
  delete: <Trash className="h-4 w-4" />,
  download: <Download className="h-4 w-4" />,
};

const ActionColumn = ({
  actions = [],
  defaultActions = {},
}: ActionColumnProps) => {
  const [openModals, setOpenModals] = useState<{ [key: string]: boolean }>({});

  const handleModalToggle = (actionId: string, isOpen: boolean) => {
    setOpenModals((prev) => ({ ...prev, [actionId]: isOpen }));
  };

  const handleAction = (action: Action) => {
    if (action.showModal) {
      handleModalToggle(action.id, true);
    } else if (action.onClick) {
      action.onClick();
    }
  };

  // Default actions configuration
  const defaultActionsList: Action[] = [
    {
      id: "view",
      icon: DEFAULT_ICONS.view,
      title: "View",
      onClick: defaultActions.view?.onClick,
      component: defaultActions.view?.component,
      isStashed: defaultActions.view?.isStashed,
    },
    {
      id: "edit",
      icon: DEFAULT_ICONS.edit,
      title: "Edit",
      onClick: defaultActions.edit?.onClick,
      component: defaultActions.edit?.component,
      showModal: !defaultActions.edit?.component,
      isStashed: defaultActions.edit?.isStashed,
      modalContent: !defaultActions.edit?.component ? (
        <>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Item</AlertDialogTitle>
            <AlertDialogDescription>
              Make changes to your item here.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={defaultActions.edit?.onClick}>
              Save changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </>
      ) : undefined,
    },
    {
      id: "delete",
      icon: DEFAULT_ICONS.delete,
      title: "Delete",
      onClick: defaultActions.delete?.onClick,
      component: defaultActions.delete?.component,
      showModal: !defaultActions.delete?.component,
      isStashed: defaultActions.delete?.isStashed,
      modalContent: !defaultActions.delete?.component ? (
        <>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={defaultActions.delete?.onClick}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </>
      ) : undefined,
    },
  ];

  // Combine default actions with custom actions
  const allActions = [...defaultActionsList, ...actions];

  // Split actions into main and dropdown actions
  const mainActions = allActions.filter((action) => !action.isStashed);
  const dropdownActions = allActions.filter((action) => action.isStashed);

  return (
    <div className="flex items-center gap-2 justify-center">
      {/* Main actions */}
      {mainActions.map((action) => (
        <React.Fragment key={action.id}>
          {action.component || (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleAction(action)}
            >
              {action.icon ||
                DEFAULT_ICONS[action.id as keyof typeof DEFAULT_ICONS] ||
                DEFAULT_ICONS.view}
            </Button>
          )}
        </React.Fragment>
      ))}

      {/* Dropdown menu for stashed actions */}
      {dropdownActions.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {dropdownActions.map((action) => (
              <React.Fragment key={action.id}>
                {action.component || (
                  <DropdownMenuItem
                    onClick={() => handleAction(action)}
                    className="flex items-center gap-2"
                  >
                    {action.icon ||
                      (DEFAULT_ICONS[
                        action.id as keyof typeof DEFAULT_ICONS
                      ] as React.ReactNode)}
                    <span>{action.title ?? action.id}</span>
                  </DropdownMenuItem>
                )}
              </React.Fragment>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {/* Modals */}
      {allActions.map(
        (action) =>
          action.showModal && (
            <AlertDialog
              key={`modal-${action.id}`}
              open={openModals[action.id]}
              onOpenChange={(isOpen) => handleModalToggle(action.id, isOpen)}
            >
              <AlertDialogContent>{action.modalContent}</AlertDialogContent>
            </AlertDialog>
          )
      )}
    </div>
  );
};

export default ActionColumn;
