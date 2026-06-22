"use client";

import { useState } from "react";
import {
  StepBody,
  StepChoiceCard,
  StepChoiceList,
  StepHeader,
} from "@/components/steps";

type SkincareProduct =
  | "cleanser"
  | "makeup-remover"
  | "toner"
  | "moisturizer"
  | "treatment-eye"
  | "treatment-face"
  | "spf"
  | "exfoliator"
  | "none";

type ProductOption = {
  value: SkincareProduct;
  label: string;
  icon?: string;
};

const productOptions: ProductOption[] = [
  { value: "cleanser", label: "Cleanser", icon: "/svgs/Group 2085660830.svg" },
  {
    value: "makeup-remover",
    label: "Makeup Remover",
    icon: "/svgs/Group 2085660831.svg",
  },
  { value: "toner", label: "Toner", icon: "/svgs/Group 2085660832.svg" },
  {
    value: "moisturizer",
    label: "Moisturizer",
    icon: "/svgs/Group 2085660833.svg",
  },
  {
    value: "treatment-eye",
    label: "Treatment (Eye)",
    icon: "/svgs/Group 2085660834.svg",
  },
  {
    value: "treatment-face",
    label: "Treatment (Face)",
    icon: "/svgs/Group 2085660835.svg",
  },
  { value: "spf", label: "SPF", icon: "/svgs/Group 2085660836.svg" },
  {
    value: "exfoliator",
    label: "Exfoliator",
    icon: "/svgs/Group 2085660837.svg",
  },
  { value: "none", label: "None" },
];

export default function SkincareProductsStep() {
  const [selectedProducts, setSelectedProducts] = useState<SkincareProduct[]>([]);

  const toggleProduct = (value: SkincareProduct) => {
    setSelectedProducts((current) => {
      if (value === "none") {
        return current.includes("none") ? [] : ["none"];
      }

      const withoutNone = current.filter((item) => item !== "none");

      if (withoutNone.includes(value)) {
        return withoutNone.filter((item) => item !== value);
      }

      return [...withoutNone, value];
    });
  };

  return (
    <div>
      <StepHeader title="Which skincare products do you use?" />

      <StepBody>
        <StepChoiceList spacing="compact">
          {productOptions.map((option) => (
            <StepChoiceCard
              key={option.value}
              variant="icon-multi"
              iconSize="product"
              icon={option.icon}
              label={option.label}
              selected={selectedProducts.includes(option.value)}
              onSelect={() => toggleProduct(option.value)}
            />
          ))}
        </StepChoiceList>
      </StepBody>
    </div>
  );
}
