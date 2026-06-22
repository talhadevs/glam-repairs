"use client";

import { useState } from "react";
import {
  StepBody,
  StepChoiceCard,
  StepChoiceList,
  StepHeader,
} from "@/components/steps";

type KoreanProduct =
  | "essence"
  | "sheet-mask"
  | "snail-serum"
  | "spf-skincare"
  | "none";

type ProductOption = {
  value: KoreanProduct;
  label: string;
  icon?: string;
};

const productOptions: ProductOption[] = [
  {
    value: "essence",
    label: "Essence",
    icon: "/svgs/Group (13).svg",
  },
  {
    value: "sheet-mask",
    label: "Sheet mask",
    icon: "/svgs/Group (14).svg",
  },
  {
    value: "snail-serum",
    label: "Snail serum",
    icon: "/svgs/Group (15).svg",
  },
  {
    value: "spf-skincare",
    label: "SPF feels skincare",
    icon: "/svgs/Group 2085660840.svg",
  },
  { value: "none", label: "None of above" },
];

export default function KoreanSkincareProductsStep() {
  const [selectedProducts, setSelectedProducts] = useState<KoreanProduct[]>([]);

  const toggleProduct = (value: KoreanProduct) => {
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
      <StepHeader title="Which korean skincare product are you most excited to try?" />

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
