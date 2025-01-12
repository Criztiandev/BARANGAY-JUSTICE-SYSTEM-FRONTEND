import {
  Avatar as SchadCnAvatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";
import { cn } from "@/common/lib/utils";

interface AvatarProps {
  src: string;
  fallback: string;
  className?: string;
}

const Avatar = ({ src, fallback, className }: AvatarProps) => {
  return (
    <SchadCnAvatar className={cn("size-10", className)}>
      <AvatarImage src={src || "https://github.com/shadcn.png"} />
      <AvatarFallback>{fallback || "CN"}</AvatarFallback>
    </SchadCnAvatar>
  );
};

export default Avatar;
