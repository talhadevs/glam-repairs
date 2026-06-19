export type PricingPlan = {
  name: string;
  price: string;
  priceNote?: string;
  cta: string;
  description: string;
  features: {
    title: string;
    description: string;
  }[];
  exclusions?: string;
  upgradeNudge?: string;
  badge?: string;
};

export const pricingPlans: PricingPlan[] = [
  {
    name: "Skin Starter",
    price: "Free",
    cta: "Try it free →",
    description: "Know your skin before you fix it.",
    features: [
      {
        title: "Skin concern quiz",
        description:
          "Questions covering skin type, lifestyle, concerns",
      },
      {
        title: "Instant skin type result",
        description: "Oily / Dry / Combination / Sensitive / Normal",
      },
      {
        title: "Generic routine guide based on your skin type",
        description: "Downloadable",
      },
      {
        title: "Access to Glam Repairs skin tips",
        description: "",
      },
    ],
    exclusions: "No photo upload. No expert review.",
    upgradeNudge:
      "Your routine above is built for your skin type, not your skin. Upload photos and let a certified aesthetics professional build one for you.",
  },
  {
    name: "Clarity",
    price: "Rs. 1,500",
    priceNote: "(one-time)",
    cta: "Get my assessment →",
    description: "Your skin, studied — not scanned.",
    features: [
      {
        title: "Full intake form",
        description: "Concerns, history, current products, diet basics",
      },
      {
        title: "Photo upload — up to 3 images",
        description: "Face + concern areas",
      },
      {
        title: "Manual expert review",
        description: "Delivered within 48 hours",
      },
      {
        title: "Personalized AM + PM skincare routine",
        description: "",
      },
      {
        title: "Ingredient & product-type guidance",
        description: "What to look for, what to avoid",
      },
      {
        title: "Written skin assessment report",
        description: "",
      },
      {
        title: "1 follow-up check-in after 2 weeks",
        description: "",
      },
    ],
  },
  {
    name: "Transform",
    price: "Rs. 3,000",
    priceNote: "(one-time)",
    badge: "Most complete",
    cta: "Start my full journey →",
    description: "A full skin strategy. Not just a routine.",
    features: [
      {
        title: "Everything in the Clarity plan",
        description: "",
      },
      {
        title: "Extended photo upload — up to 6 images",
        description: "",
      },
      {
        title: "Priority expert review within 24 hours",
        description: "",
      },
      {
        title: "Detailed month-long skin plan",
        description: "Week-by-week expectations set",
      },
      {
        title: "2 biweekly follow-ups",
        description: "Full month of expert support",
      },
      {
        title: "Ingredient recommendations across price ranges",
        description: "",
      },
      {
        title: "Vitamin & supplement guide",
        description: "Key nutrients for your skin concerns",
      },
      {
        title: "Lifestyle & diet tips tied to your skin",
        description: "",
      },
      {
        title: "Aesthetic procedure roadmap",
        description:
          "If and when you'd benefit from in-clinic treatment",
      },
      {
        title: "Direct communication access during the plan period",
        description: "WhatsApp",
      },
    ],
  },
];
