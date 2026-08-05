import FieldError from "@/components/ui/FieldError";

type StepRequiredErrorProps = {
  message?: string;
  id?: string;
};

export default function StepRequiredError({
  message,
  id = "step-required-error",
}: StepRequiredErrorProps) {
  return <FieldError id={id} message={message} />;
}
