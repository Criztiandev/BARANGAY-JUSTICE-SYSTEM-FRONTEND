import { Badge } from "@/common/components/atoms/ui/badge";
import { Case } from "../interface/case";
import columnBuilder from "@/utils/table/column-builder.ts";
import ActionColumn from "@/common/components/molecules/table/columns/action-column";
import { DownloadIcon } from "lucide-react";
import TextColumn from "@/common/components/molecules/table/columns/text-input-column";
import ToggleColumn from "@/common/components/molecules/table/columns/toggle-column";

const caseColumns = columnBuilder<Case>([
  {
    id: "caseNumber",
    accessorKey: "caseNumber",
    header: "Case Number",
    cell: (props) => <TextColumn {...props} />,
  },
  {
    id: "caseType",
    accessorKey: "caseType",
    header: "Case Type",
    cell: () => (
      <ToggleColumn
        label="Active"
        variant="danger"
        defaultValue={false}
        onToggleOn={() => console.log("Toggled On")}
        onToggleOff={() => console.log("Toggled Off")}
        onChange={(value) => console.log("Changed:", value)}
        info="This is a toggle column"
      />
    ),
  },
  {
    id: "filingDate",
    accessorKey: "filingDate",
    header: "Filing Date",
  },

  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={status === "Active" ? "default" : "secondary"}>
          {status}
        </Badge>
      );
    },
  },

  {
    id: "actions",
    header: () => <div className="text-center mx-auto">Actions</div>,
    cell: () => {
      return (
        <ActionColumn
          actions={[
            {
              icon: <DownloadIcon size={16} />,
              id: "Download",
              onClick: () => {
                alert("download");
              },
              isStashed: true,
            },
          ]}
        />
      );
    },
  },
]);

export default caseColumns;
