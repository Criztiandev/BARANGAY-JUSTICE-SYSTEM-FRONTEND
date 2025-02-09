import { Button } from "@/common/components/atoms/ui/button";

interface Props {
  onReset: () => void;
}

const ErrorScreen = ({ onReset }: Props) => {
  return (
    <div className="w-full min-h-screen">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold">Oops! Something went wrong.</h1>
        <p className="text-sm text-muted-foreground">Please try again later.</p>
      </div>
      <Button onClick={onReset}>Home</Button>
    </div>
  );
};

export default ErrorScreen;
