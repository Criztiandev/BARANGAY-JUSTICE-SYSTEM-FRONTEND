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
  createAction?: React.ReactNode;
}

// Extract these into separate components at the top level
const SearchSection = ({
  config,
  table,
}: {
  config: ActionConfig<any>;
  table: Table<any>;
}) => {
  if (!config.search?.hidden) {
    return (
      <div className="relative w-64">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          value={table.getState().globalFilter ?? ""}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          className={`pl-8 ${config.search?.className ?? ""}`}
          placeholder={config.search?.placeholder}
        />
      </div>
    );
  }
  return null;
};

const FilterSection = ({
  config,
  table,
}: {
  config: ActionConfig<any>;
  table: Table<any>;
}) => {
  if (!config.filter || config.filter.hidden) return null;

  const handleFilterClick = (field: string, value: any) => {
    table.setColumnFilters((prev) => {
      const filtered = prev.filter((filter) => filter.id !== field);
      return [...filtered, { id: field, value }];
    });
  };

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
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Root level options */}
        {config.filter.field && config.filter.options && (
          <DropdownMenuGroup>
            {config.filter.options.map((option) => (
              <DropdownMenuItem
                key={`${String(config.filter?.field)}-${option.value}`}
                onClick={() =>
                  handleFilterClick(String(config.filter?.field), option.value)
                }
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
                  <DropdownMenuSubTrigger>{group.label}</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent sideOffset={8}>
                    {group.options.map((option) => (
                      <DropdownMenuItem
                        key={`${group.field}-${option.value}`}
                        onClick={() =>
                          handleFilterClick(group.field, option.value)
                        }
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
const MoreActions = ({ config }: { config: ActionConfig<any> }) => {
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
          {config.moreActions.trigger ?? <MoreHorizontal className="h-4 w-4" />}
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

const BulkActionButton = ({
  action,
  selectedRows,
}: {
  action: any;
  selectedRows: any[];
}) => {
  return (
    <Button
      variant={action.variant ?? "default"}
      size="sm"
      onClick={action.onClick}
      disabled={action.disabled || selectedRows.length === 0}
      hidden={action.hidden}
      className="flex items-center gap-2"
    >
      {action.icon && <span>{action.icon}</span>}
      {action.label}
    </Button>
  );
};

// Render bulk actions
const BulkActions = ({
  config,
  table,
}: {
  config: ActionConfig<any>;
  table: Table<any>;
}) => {
  if (!config.bulkActions || config.bulkActions.hidden) return null;

  const selectedRows = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);

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
          <BulkActionButton
            key={action.id}
            action={action}
            selectedRows={selectedRows}
          />
        )
      )}
    </div>
  );
};

function DataTableAction<TData>({
  config,
  table,
  createAction,
}: Readonly<DataTableActionProps<TData>>) {
  const hasSelection =
    Object.keys(table.getState().rowSelection || {}).length > 0;

  return (
    <div className="flex items-center justify-between gap-4 ">
      <div className="flex flex-1 items-center gap-2">
        <SearchSection config={config} table={table} />
      </div>
      <div className="flex items-center gap-2">
        {hasSelection ? (
          <BulkActions config={config} table={table} />
        ) : (
          <>
            <FilterSection config={config} table={table} />
            {createAction}
            <MoreActions config={config} />
          </>
        )}
      </div>
    </div>
  );
}

export default DataTableAction;
