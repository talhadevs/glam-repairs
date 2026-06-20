import type { ReactNode } from "react";
import FieldError from "@/components/ui/FieldError";
import { formLabelClassName } from "@/components/ui/fieldStyles";

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
};

export function getFieldErrorId(fieldId: string) {
  return `${fieldId}-error`;
}

export default function FormField({
  id,
  label,
  error,
  required = false,
  className = "",
  children,
}: FormFieldProps) {
  const errorId = getFieldErrorId(id);

  return (
    <div className={className}>
      <label htmlFor={id} className={formLabelClassName}>
        {label}
        {required ? <span className="sr-only"> (required)</span> : null}
      </label>
      {children}
      <FieldError id={errorId} message={error} />
    </div>
  );
}
