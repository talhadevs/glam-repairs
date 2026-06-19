export type ComparisonCell =
  | { type: "check" }
  | { type: "dash" }
  | { type: "text"; value: string };

export type ComparisonRow = {
  feature: string;
  values: [ComparisonCell, ComparisonCell, ComparisonCell];
};

export const comparisonTitle = "See what's included in each plan";

export const comparisonPlans = [
  { name: "Skin Starter", subtitle: "Free" },
  { name: "Clarity", subtitle: "Rs. 1,500" },
  { name: "Transform", subtitle: "Rs. 3,000" },
] as const;

export const comparisonPrices: [string, string, string] = [
  "Free",
  "Rs. 1,500 one-time",
  "Rs. 3,000 one-time",
];

export const comparisonRows: ComparisonRow[] = [
  {
    feature: "Skin quiz & type assessment",
    values: [{ type: "check" }, { type: "check" }, { type: "check" }],
  },
  {
    feature: "Generic routine guide",
    values: [{ type: "check" }, { type: "dash" }, { type: "dash" }],
  },
  {
    feature: "Photo upload",
    values: [
      { type: "dash" },
      { type: "text", value: "Up to 3" },
      { type: "text", value: "Up to 6" },
    ],
  },
  {
    feature: "Expert manual review",
    values: [
      { type: "dash" },
      { type: "text", value: "48 hrs" },
      { type: "text", value: "24 hrs priority" },
    ],
  },
  {
    feature: "Written skin report",
    values: [
      { type: "dash" },
      { type: "check" },
      { type: "text", value: "Detailed" },
    ],
  },
  {
    feature: "AM + PM routine",
    values: [{ type: "dash" }, { type: "check" }, { type: "check" }],
  },
  {
    feature: "Ingredient & product guidance",
    values: [
      { type: "dash" },
      { type: "check" },
      { type: "text", value: "Multi-budget" },
    ],
  },
  {
    feature: "What to avoid list",
    values: [{ type: "dash" }, { type: "check" }, { type: "check" }],
  },
  {
    feature: "Week-by-week plan",
    values: [{ type: "dash" }, { type: "dash" }, { type: "check" }],
  },
  {
    feature: "Vitamin & supplement guide",
    values: [{ type: "dash" }, { type: "dash" }, { type: "check" }],
  },
  {
    feature: "Lifestyle & diet tips",
    values: [{ type: "dash" }, { type: "dash" }, { type: "check" }],
  },
  {
    feature: "Aesthetic procedure roadmap",
    values: [{ type: "dash" }, { type: "dash" }, { type: "check" }],
  },
  {
    feature: "Follow-up check-ins",
    values: [
      { type: "dash" },
      { type: "text", value: "1 (at 2 weeks)" },
      { type: "text", value: "2 (biweekly, 1 month)" },
    ],
  },
  {
    feature: "Direct WhatsApp access",
    values: [{ type: "dash" }, { type: "dash" }, { type: "check" }],
  },
];
