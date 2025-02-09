import LogoutDialog from "@/common/components/molecules/dialog/logout-dialog";

const userMenuGroups = [
  {
    label: "My Account",
    items: [
      { label: "Profile", shortcut: "⇧⌘P", href: "/profile" },
      { label: "Settings", shortcut: "⌘S", href: "/settings" },
    ],
  },
  {
    items: [
      {
        label: "Log out",
        shortcut: "⇧⌘Q",
        component: (
          <LogoutDialog
            label="Log out"
            title="Log out"
            description="Are you sure you want to log out?"
          />
        ),
      },
    ],
  },
];

export default userMenuGroups;
