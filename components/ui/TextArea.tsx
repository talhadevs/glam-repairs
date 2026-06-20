import { forwardRef, type TextareaHTMLAttributes } from "react";
import { getFormControlClassName } from "@/components/ui/fieldStyles";
import { getFieldErrorId } from "@/components/ui/FormField";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hasError?: boolean;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { hasError = false, className = "", id, required, "aria-describedby": ariaDescribedBy, ...props },
  ref,
) {
  const errorId = id ? getFieldErrorId(id) : undefined;

  return (
    <textarea
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

export default TextArea;
