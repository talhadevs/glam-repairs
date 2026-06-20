import { forwardRef, type InputHTMLAttributes } from "react";
import { getFormControlClassName } from "@/components/ui/fieldStyles";
import { getFieldErrorId } from "@/components/ui/FormField";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { hasError = false, className = "", id, required, "aria-describedby": ariaDescribedBy, ...props },
  ref,
) {
  const errorId = id ? getFieldErrorId(id) : undefined;

  return (
    <input
      ref={ref}
      id={id}
      aria-required={required ? true : undefined}
      aria-invalid={hasError || undefined}
      aria-describedby={hasError && errorId ? errorId : ariaDescribedBy}
      className={getFormControlClassName(hasError, className)}
      {...props}
    />
  );
});

export default TextInput;
