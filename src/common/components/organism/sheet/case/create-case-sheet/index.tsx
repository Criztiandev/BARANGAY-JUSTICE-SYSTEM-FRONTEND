import { Button } from "@/common/components/atoms/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/atoms/ui/dialog";

import useMultiStepForm from "@/common/hooks/form/use-multi-step-form";
import CompliantInfoStep from "./steps/compliant-info-step";
import RespondentInfoStep from "./steps/respondent-info-step";
import OtherInfoStep from "./steps/other-info-step";
import { XStack } from "@/common/components/atoms/ui/stack";

const CreateCaseSheet = () => {
  const { step, isFirstStep, isLastStep, next, back, currentStepIndex, steps } =
    useMultiStepForm({
      steps: [
        <CompliantInfoStep key={"compliant"} />,
        <RespondentInfoStep key={"respondent"} />,
        <OtherInfoStep key={"other"} />,
      ],
    });

  const stepTitle = () => {
    if (isFirstStep) {
      return "Compliant Information";
    }

    if (isLastStep) {
      return "Other Information";
    }

    return "Respondent Information";
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Create</Button>
      </DialogTrigger>
      <DialogContent className="px-4 max-w-2xl min-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>{stepTitle()}</span>
            <span className="text-sm text-muted-foreground pr-6">
              {currentStepIndex + 1} / {steps.length}
            </span>
          </DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 mb-4">{step}</div>
        <DialogFooter>
          <XStack className="justify-between space-x-2">
            {!isFirstStep && (
              <Button variant="outline" onClick={back}>
                Back
              </Button>
            )}
            <Button onClick={next}>{isLastStep ? "Submit" : "Next"}</Button>
          </XStack>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCaseSheet;
