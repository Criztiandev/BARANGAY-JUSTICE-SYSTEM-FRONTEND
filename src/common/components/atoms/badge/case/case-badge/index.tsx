import { Badge } from "@/common/components/atoms/ui/badge";
import { XStack } from "@/common/components/atoms/ui/stack";

interface CaseBadgeProps {
  label: string;
  count: number;
}

const CaseBadge = ({ label, count }: CaseBadgeProps) => {
  return (
    <XStack className="space-x-2 items-center justify-between w-full">
      <span className="text-sm text-muted-foreground font-semibold">
        {label}:
      </span>
      <Badge variant="outline" className="h-6">
        <span className="text-sm text-muted-foreground">{count}</span>
      </Badge>
    </XStack>
  );
};

export default CaseBadge;
