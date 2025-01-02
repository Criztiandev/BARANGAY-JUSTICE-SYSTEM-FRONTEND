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
        onClick: () => {
          console.log("hi");
        },
      },
    ],
  },
];

export default userMenuGroups;
