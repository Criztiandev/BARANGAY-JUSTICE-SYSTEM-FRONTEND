import { Button } from "@/common/components/atoms/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/common/components/atoms/ui/sheet";

import useMultiStepForm from "@/common/hooks/form/use-multi-step-form";
import CompliantInfoStep from "./steps/compliant-info-step";
import RespondentInfoStep from "./steps/respondent-info-step";
import OtherInfoStep from "./steps/other-info-step";
import { XStack } from "@/common/components/atoms/ui/stack";

const CreateCaseSheet = () => {
  const { step, isFirstStep, isLastStep, next, back, currentStepIndex, steps } =
    useMultiStepForm({
      steps: [<CompliantInfoStep />, <RespondentInfoStep />, <OtherInfoStep />],
    });
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Create</Button>
      </SheetTrigger>
      <SheetContent className="px-4 max-w-2xl min-w-[500px]">
        <SheetHeader>
          <SheetTitle className="flex justify-between items-center">
            <span>
              {isFirstStep
                ? "Compliant Information"
                : isLastStep
                ? "Other Information"
                : "Respondent Information"}
            </span>
            <span className="text-sm text-muted-foreground pr-6">
              {currentStepIndex + 1} / {steps.length}
            </span>
          </SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-2 mb-4">{step}</div>
        <SheetFooter>
          <XStack className="justify-between space-x-2">
            <Button variant="outline" onClick={back}>
              Back
            </Button>
            <Button onClick={next}>{isLastStep ? "Submit" : "Next"}</Button>
          </XStack>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CreateCaseSheet;
