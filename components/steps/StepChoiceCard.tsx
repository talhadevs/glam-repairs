import Image from "next/image";
import { cn } from "@/lib/cn";
import SelectionIndicator from "@/components/steps/SelectionIndicator";
import {
  choiceCardBaseClassName,
  choiceCardSelectedClassName,
  choiceCardUnselectedClassName,
  choiceLabelClassName,
} from "@/components/steps/stepStyles";

type StepChoiceCardBaseProps = {
  label: string;
  selected: boolean;
  onSelect: () => void;
  className?: string;
};

type TextVariant = StepChoiceCardBaseProps & {
  variant: "text";
  labelStyle?: keyof typeof choiceLabelClassName;
};

type IndicatorEndVariant = StepChoiceCardBaseProps & {
  variant: "indicator-end";
};

type CompactIconVariant = StepChoiceCardBaseProps & {
  variant: "compact-icon";
  icon: string;
};

type IconVariant = StepChoiceCardBaseProps & {
  variant: "icon";
  icon?: string;
  iconSize?: "medium" | "large";
  labelStyle?: keyof typeof choiceLabelClassName;
};

type IconMultiVariant = StepChoiceCardBaseProps & {
  variant: "icon-multi";
  icon?: string;
  iconSize?: "product" | "goal";
  indicatorBorder?: "default" | "lavender";
};

type DescriptionVariant = StepChoiceCardBaseProps & {
  variant: "description";
  description: string;
  icon: string;
};

type ColorSwatchVariant = StepChoiceCardBaseProps & {
  variant: "color-swatch";
  color?: string;
};

export type StepChoiceCardProps =
  | TextVariant
  | IndicatorEndVariant
  | CompactIconVariant
  | IconVariant
  | IconMultiVariant
  | DescriptionVariant
  | ColorSwatchVariant;

function choiceStateClass(selected: boolean) {
  return selected ? choiceCardSelectedClassName : choiceCardUnselectedClassName;
}

export default function StepChoiceCard(props: StepChoiceCardProps) {
  const { label, selected, onSelect, className } = props;

  if (props.variant === "text") {
    const labelStyle = props.labelStyle ?? "default";

    return (
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className={cn(
          choiceCardBaseClassName,
          "items-center px-4 py-3.5 sm:px-5 sm:py-4",
          choiceStateClass(selected),
          className,
        )}
      >
        <span className={choiceLabelClassName[labelStyle]}>{label}</span>
      </button>
    );
  }

  if (props.variant === "indicator-end") {
    return (
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className={cn(
          choiceCardBaseClassName,
          "items-center justify-between gap-4 px-4 py-3.5 sm:px-5 sm:py-4",
          choiceStateClass(selected),
          className,
        )}
      >
        <span className={choiceLabelClassName.default}>{label}</span>
        <SelectionIndicator selected={selected} />
      </button>
    );
  }

  if (props.variant === "compact-icon") {
    return (
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className={cn(
          choiceCardBaseClassName,
          "items-center gap-2.5 px-3 py-2.5 sm:gap-3 sm:px-3.5 sm:py-3",
          choiceStateClass(selected),
          className,
        )}
      >
        <SelectionIndicator selected={selected} />
        <span className="flex h-5 w-5 shrink-0 items-center justify-center sm:h-[1.35rem] sm:w-[1.35rem]">
          <Image
            src={props.icon}
            alt=""
            width={21}
            height={21}
            className="h-5 w-auto object-contain"
          />
        </span>
        <span className={choiceLabelClassName.default}>{label}</span>
      </button>
    );
  }

  if (props.variant === "icon") {
    const iconSize = props.iconSize ?? "medium";
    const labelStyle = props.labelStyle ?? "default";

    return (
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className={cn(
          choiceCardBaseClassName,
          iconSize === "large"
            ? "items-center gap-3 px-3.5 py-3 sm:gap-4 sm:px-4 sm:py-3.5"
            : "items-center gap-3.5 px-4 py-3.5 sm:gap-4 sm:px-5 sm:py-4",
          choiceStateClass(selected),
          props.icon ? null : "sm:pl-5",
          className,
        )}
      >
        {props.icon ? (
          <span
            className={cn(
              "flex shrink-0 items-center justify-center",
              iconSize === "large"
                ? "h-10 w-11 sm:h-11 sm:w-12"
                : "h-10 w-10 sm:h-11 sm:w-11",
            )}
          >
            <Image
              src={props.icon}
              alt=""
              width={iconSize === "large" ? 48 : 50}
              height={iconSize === "large" ? 48 : 50}
              className={
                iconSize === "large"
                  ? "h-10 w-10 object-contain sm:h-11 sm:w-11"
                  : "h-10 w-auto object-contain sm:h-11"
              }
            />
          </span>
        ) : null}
        <span className={choiceLabelClassName[labelStyle]}>{label}</span>
      </button>
    );
  }

  if (props.variant === "icon-multi") {
    const iconSize = props.iconSize ?? "goal";

    return (
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className={cn(
          choiceCardBaseClassName,
          "items-center gap-3 px-3.5 py-3 sm:gap-4 sm:px-4 sm:py-3.5",
          choiceStateClass(selected),
          props.icon ? null : "sm:pl-5",
          className,
        )}
      >
        {props.icon ? (
          <span
            className={cn(
              "flex shrink-0 items-center justify-center",
              iconSize === "product"
                ? "h-9 w-9 sm:h-10 sm:w-10"
                : "h-10 w-11 sm:h-11 sm:w-12",
            )}
          >
            <Image
              src={props.icon}
              alt=""
              width={iconSize === "product" ? 40 : 48}
              height={iconSize === "product" ? 54 : 48}
              className={
                iconSize === "product"
                  ? "h-9 w-auto max-w-[2.125rem] object-contain sm:h-10"
                  : "h-10 w-10 object-contain sm:h-11 sm:w-11"
              }
            />
          </span>
        ) : null}

        <span
          className={cn(
            "min-w-0 flex-1 text-sm sm:text-[0.9375rem]",
            selected ? "text-brand-light" : "text-brand-ink",
          )}
        >
          {label}
        </span>

        <SelectionIndicator
          selected={selected}
          unselectedBorder={props.indicatorBorder ?? "default"}
        />
      </button>
    );
  }

  if (props.variant === "description") {
    return (
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className={cn(
          choiceCardBaseClassName,
          "items-start gap-4 px-4 py-4 sm:gap-5 sm:px-5 sm:py-[1.125rem]",
          choiceStateClass(selected),
          className,
        )}
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center sm:h-[3.25rem] sm:w-[3.25rem]">
          <Image
            src={props.icon}
            alt=""
            width={52}
            height={52}
            className="h-11 w-auto object-contain sm:h-12"
          />
        </span>

        <span className="min-w-0 flex-1 pt-0.5">
          <span className="block text-base font-semibold text-brand-ink sm:text-[1.05rem]">
            {label}
          </span>
          <span className="mt-1 block text-sm leading-relaxed text-brand-gray sm:text-[0.9375rem]">
            {props.description}
          </span>
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        choiceCardBaseClassName,
        "items-center gap-4 px-4 py-3.5 sm:gap-5 sm:px-5 sm:py-4",
        choiceStateClass(selected),
        props.color ? null : "justify-center sm:justify-start",
        className,
      )}
    >
      {props.color ? (
        <span
          className="h-9 w-9 shrink-0 rounded-full border border-black/5 sm:h-10 sm:w-10"
          style={{ backgroundColor: props.color }}
          aria-hidden
        />
      ) : null}
      <span className={choiceLabelClassName.default}>{label}</span>
    </button>
  );
}
