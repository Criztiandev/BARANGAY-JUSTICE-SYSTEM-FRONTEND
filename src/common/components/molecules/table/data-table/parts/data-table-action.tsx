import { Input } from "@/common/components/atoms/ui/input";
import { Button } from "@/common/components/atoms/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/common/components/atoms/ui/dropdown-menu";
import { Filter, MoreHorizontal, Search } from "lucide-react";
import { ActionConfig } from "../types/action.types";
import { Table } from "@tanstack/react-table";

interface DataTableActionProps<TData> {
  config: ActionConfig<TData>;
  table: Table<TData>;
}

function DataTableAction<TData>({
  config,
  table,
}: Readonly<DataTableActionProps<TData>>) {
  const selectedRows = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);
  const { globalFilter } = table.getState();

  // Render search section
  const renderSearch = () => {
    if (!config.search?.hidden) {
      return (
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id={config.search?.id}
            placeholder={config.search?.placeholder}
            value={globalFilter ?? ""}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            className={`pl-8 ${config.search?.className ?? ""}`}
          />
        </div>
      );
    }
    return null;
  };

  // Render filter section
  const renderFilter = () => {
    if (!config.filter || config.filter.hidden) return null;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            id={config.filter.id}
            className={config.filter.className}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel>Filter by</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* Root level options */}
          {config.filter.field && config.filter.options && (
            <DropdownMenuGroup>
              {config.filter.options.map((option) => (
                <DropdownMenuItem
                  key={`${String(config.filter?.field)}-${option.value}`}
                  onClick={() => {
                    table.setColumnFilters((prev) => {
                      const filtered = prev.filter(
                        (filter) => filter.id !== String(config.filter?.field)
                      );
                      return [
                        ...filtered,
                        {
                          id: String(config.filter?.field),
                          value: option.value,
                        },
                      ];
                    });
                  }}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          )}

          {/* Group options */}
          {config.filter.groups && config.filter.groups.length > 0 && (
            <>
              {config.filter.field && config.filter.options && (
                <DropdownMenuSeparator />
              )}
              <DropdownMenuGroup>
                {config.filter.groups.map((group) => (
                  <DropdownMenuSub key={group.field}>
                    <DropdownMenuSubTrigger>
                      {group.label}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      {group.options.map((option) => (
                        <DropdownMenuItem
                          key={`${group.field}-${option.value}`}
                          onClick={() => {
                            table.setColumnFilters((prev) => {
                              const filtered = prev.filter(
                                (filter) => filter.id !== group.field
                              );
                              return [
                                ...filtered,
                                {
                                  id: group.field,
                                  value: option.value,
                                },
                              ];
                            });
                          }}
                        >
                          {option.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                ))}
              </DropdownMenuGroup>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  // Render more actions dropdown
  const renderMoreActions = () => {
    if (!config.moreActions || config.moreActions.hidden) return null;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            id={config.moreActions.id}
            className={config.moreActions.className}
          >
            {config.moreActions.trigger ?? (
              <MoreHorizontal className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={config.moreActions.placement === "left" ? "start" : "end"}
          className="w-56"
        >
          {config.moreActions.actions.map((action) => (
            <DropdownMenuItem
              key={action.id}
              onClick={() => action.onClick()}
              disabled={action.disabled}
              hidden={action.hidden}
            >
              {action.type === "custom" ? (
                action.component
              ) : (
                <>
                  {action.icon && <span className="mr-2">{action.icon}</span>}
                  {action.label}
                </>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  // Render bulk actions
  const renderBulkActions = () => {
    if (!config.bulkActions || config.bulkActions.hidden) return null;

    return (
      <div
        id={config.bulkActions.id}
        className={`flex items-center gap-2 ${
          config.bulkActions.className ?? ""
        }`}
      >
        {config.bulkActions.actions.map((action) =>
          action.type === "custom" ? (
            <div key={action.id}>{action.component}</div>
          ) : (
            <Button
              key={action.id}
              variant={action.variant ?? "default"}
              size="sm"
              onClick={() => {
                if (action.confirmationRequired) {
                  if (
                    window.confirm(
                      action.confirmationMessage ?? "Are you sure?"
                    )
                  ) {
                    action.onClick(selectedRows);
                  }
                } else {
                  action.onClick(selectedRows);
                }
              }}
              disabled={action.disabled || selectedRows.length === 0}
              hidden={action.hidden}
              className="flex items-center gap-2"
            >
              {action.icon && <span>{action.icon}</span>}
              {action.label}
            </Button>
          )
        )}
      </div>
    );
  };

  const hasSelection =
    table.getState().rowSelection &&
    Object.keys(table.getState().rowSelection).length > 0;

  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex flex-1 items-center gap-2">{renderSearch()}</div>
      <div className="flex items-center gap-2">
        {hasSelection ? (
          renderBulkActions()
        ) : (
          <>
            {renderFilter()}
            {renderMoreActions()}
          </>
        )}
      </div>
    </div>
  );
}

export default DataTableAction;
