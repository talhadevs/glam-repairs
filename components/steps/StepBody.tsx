import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { stepBodySpacingClassName } from "@/components/steps/stepStyles";

type StepBodyProps = {
  children: ReactNode;
  spacing?: keyof typeof stepBodySpacingClassName;
  className?: string;
};

export default function StepBody({
  children,
  spacing = "default",
  className,
}: StepBodyProps) {
  return (
    <div className={cn(stepBodySpacingClassName[spacing], className)}>
      {children}
    </div>
  );
}
