import { XStack } from "../../../atoms/ui/stack";
import AvatarMenu, { AvatarMenuProps } from "../../../atoms/avatar/AvatarMenu";
import ThemeToggle from "@/common/components/molecules/dropdown/other/theme-toggle";

interface TopbarProps extends AvatarMenuProps {
  children?: React.ReactNode;
}

const Topbar = ({ children, ...props }: TopbarProps) => {
  return (
    <header className="fixed z-50 w-full flex justify-between items-center px-4 py-2 bg-background border-b h-16">
      <XStack className="space-x-2 items-center">
        <div className="text-lg font-bold">Logo</div>
      </XStack>

      <nav className="flex space-x-2 ">
        <div className="mx-4 space-x-2">{children}</div>
        <div className="flex space-x-4 items-center">
          <AvatarMenu {...props} />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Topbar;
