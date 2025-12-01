import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Basic Information",
    description: "Tell us about your salon"
  },
  {
    id: 2,
    title: "Location & Services",
    description: "Where are you and what do you offer?"
  },
  {
    id: 3,
    title: "Verification",
    description: "Verify your contact information"
  },
  {
    id: 4,
    title: "Review & Submit",
    description: "Final step before approval"
  }
];

interface RegistrationStepsProps {
  currentStep: number;
  onStepChange?: (step: number) => void;
}

export const RegistrationSteps = ({ currentStep, onStepChange }: RegistrationStepsProps) => {
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full mb-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <Progress value={progress} className="h-2 mb-4" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Step {currentStep} of {steps.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between items-center">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isClickable = onStepChange && step.id <= currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "w-10 h-10 rounded-full p-0 mb-2 transition-all duration-200",
                  isCompleted && "bg-primary text-primary-foreground hover:bg-primary",
                  isCurrent && "bg-primary/10 text-primary border-2 border-primary",
                  !isCompleted && !isCurrent && "bg-muted text-muted-foreground",
                  isClickable && "cursor-pointer hover:scale-105",
                  !isClickable && "cursor-default"
                )}
                onClick={() => isClickable && onStepChange(step.id)}
                disabled={!isClickable}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-semibold">{step.id}</span>
                )}
              </Button>
              
              <div className="text-center">
                <div className={cn(
                  "text-sm font-medium transition-colors",
                  isCurrent ? "text-primary" : "text-muted-foreground"
                )}>
                  {step.title}
                </div>
                <div className="text-xs text-muted-foreground mt-1 hidden sm:block">
                  {step.description}
                </div>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className={cn(
                  "absolute h-0.5 w-full max-w-[100px] mt-5 transition-colors",
                  isCompleted ? "bg-primary" : "bg-muted",
                  "hidden sm:block"
                )} 
                style={{ 
                  left: `${((index + 1) / steps.length) * 100}%`,
                  transform: "translateX(-50%)"
                }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};