import { Badge } from "@/common/components/atoms/ui/badge";
import columnBuilder from "@/utils/table/column-builder.ts";
import ActionColumn from "@/common/components/molecules/table/columns/action-column";
import TextColumn from "@/common/components/molecules/table/columns/text-column";
import ToggleColumn from "@/common/components/molecules/table/columns/toggle-column";
import { Case } from "../types/query.types";
import { useNavigate } from "react-router-dom";

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
    cell: ({ row }) => {
      const { _id } = row.original;
      const navigate = useNavigate();

      return (
        <ActionColumn
          defaultActions={{
            view: {
              onClick: () => navigate(`/cases/${_id}`),
            },
          }}
        />
      );
    },
  },
]);

export default caseColumns;
