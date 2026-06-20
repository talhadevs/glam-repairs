import { formFieldErrorClassName } from "@/components/ui/fieldStyles";

type FieldErrorProps = {
  id: string;
  message?: string;
};

export default function FieldError({ id, message }: FieldErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} role="alert" className={formFieldErrorClassName}>
      {message}
    </p>
  );
}
