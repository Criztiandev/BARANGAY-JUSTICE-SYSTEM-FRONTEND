import { Button } from "@/common/components/atoms/ui/button";

interface Props {
  onReset: () => void;
}

const ErrorScreen = ({ onReset }: Props) => {
  return (
    <div className="w-full min-h-screen">
      <Button onClick={onReset}>Home</Button>
    </div>
  );
};

export default ErrorScreen;
