"use client";

import { useState } from "react";
import {
  StepBody,
  StepChoiceCard,
  StepChoiceList,
  StepHeader,
} from "@/components/steps";

type KoreanIngredient =
  | "snail-mucin"
  | "ginseng"
  | "centella-asiatica"
  | "rice-water"
  | "green-tea"
  | "none";

type IngredientOption = {
  value: KoreanIngredient;
  label: string;
  icon?: string;
};

const ingredientOptions: IngredientOption[] = [
  {
    value: "snail-mucin",
    label: "Snail mucin",
    icon: "/svgs/Group (10).svg",
  },
  {
    value: "ginseng",
    label: "Ginseng",
    icon: "/svgs/Group (11).svg",
  },
  {
    value: "centella-asiatica",
    label: "Centella Asiatica",
    icon: "/svgs/Group (12).svg",
  },
  {
    value: "rice-water",
    label: "Rice water",
    icon: "/svgs/Group 2085660839.svg",
  },
  {
    value: "green-tea",
    label: "Green tea",
    icon: "/svgs/Layer_1.svg",
  },
  { value: "none", label: "None of above" },
];

export default function KoreanIngredientsStep() {
  const [selectedIngredients, setSelectedIngredients] = useState<
    KoreanIngredient[]
  >([]);

  const toggleIngredient = (value: KoreanIngredient) => {
    setSelectedIngredients((current) => {
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
      <StepHeader
        title="Any Korean ingredients you want to try?"
        subtitle="Pick the K-beauty ingredients you're curious about:"
      />

      <StepBody>
        <StepChoiceList spacing="compact">
          {ingredientOptions.map((option) => (
            <StepChoiceCard
              key={option.value}
              variant="icon-multi"
              iconSize="goal"
              indicatorBorder="lavender"
              icon={option.icon}
              label={option.label}
              selected={selectedIngredients.includes(option.value)}
              onSelect={() => toggleIngredient(option.value)}
            />
          ))}
        </StepChoiceList>
      </StepBody>
    </div>
  );
}
