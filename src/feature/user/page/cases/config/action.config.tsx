import { Case } from "@/feature/user/interface/case";
import actionBuilder from "@/utils/table/action-builder.ts";

const caseActionConfig = actionBuilder<Case>({
  // Search configuration
  search: {
    placeholder: "Search users...",
  },

  // Filter configuration
  filter: {
    field: "status",
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
    groups: [
      {
        field: "status",
        label: "Status",
        options: [
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
        ],
      },
      {
        field: "role",
        label: "Role",
        options: [
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" },
        ],
      },
    ],
    onChange: (field, value) => {
      console.log(`Filter ${field}:`, value);
    },
  },

  // More actions configuration
  moreActions: {
    actions: [
      {
        id: "export",
        type: "button",
        label: "Export",
        onClick: () => console.log("Export clicked"),
      },
    ],
  },

  // Bulk actions configuration
  bulkActions: {
    actions: [
      {
        id: "bulk-delete",
        type: "delete",
        label: "Delete Selected",
        onClick: (items) => console.log("Deleting:", items),
      },
      {
        id: "bulk-archive",
        type: "archive",
        label: "Archive Selected",
        onClick: (items) => console.log("Archiving:", items),
      },
    ],
  },
});

export default caseActionConfig;
