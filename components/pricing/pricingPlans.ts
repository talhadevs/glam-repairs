export type PricingPlan = {
  name: string;
  price: string;
  cta: string;
  description: string;
  features: {
    title: string;
    description: string;
  }[];
  exclusions?: string;
  badge?: string;
};

export const pricingPlans: PricingPlan[] = [
  {
    name: "Skin Savvy",
    price: "0.00",
    cta: "TRY IT FREE",
    description: "Know your skin before you fix it.",
    features: [
      {
        title: "Skin concern quiz",
        description:
          "questions covering skin type, lifestyle, concerns",
      },
      {
        title: "Instant skin type result",
        description: "Oily / Dry / Combination / Sensitive / Normal",
      },
      {
        title: "Generic routine guide based on your skin type",
        description: "downloadable",
      },
      {
        title: "Access to Glam Repairs skin tips",
        description: "",
      },
    ],
    exclusions: "No photo upload. No expert review",
  },
  {
    name: "Skin Clarity",
    price: "1500",
    cta: "GET MY SKIN ASSESSMENT",
    description: "Your skin, studied - not scanned.",
    features: [
      {
        title: "Full intake form",
        description: "concerns, history, current products, diet basics",
      },
      {
        title: "Photo upload — up to 3 images",
        description: "face + concern areas",
      },
      {
        title: "Manual expert review",
        description: "delivered within 48 hours",
      },
      {
        title: "Personalized AM + PM skincare routine",
        description: "",
      },
      {
        title: "Ingredient & product-type guidance",
        description: "what to look for, what to avoid",
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
    name: "Skin Transform",
    price: "3000",
    badge: "Most Complete",
    cta: "START MY FULL SKIN JOURNEY",
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
        description: "week-by-week expectations set",
      },
      {
        title: "2 biweekly follow-ups",
        description: "full month of expert support",
      },
      {
        title: "Ingredient recommendations across price ranges",
        description: "",
      },
      {
        title: "Vitamin & supplement guide",
        description: "key nutrients for your skin concerns",
      },
      {
        title: "Lifestyle & diet tips tied to your skin",
        description: "",
      },
      {
        title: "Aesthetic procedure roadmap",
        description:
          "if and when you'd benefit from in-clinic treatment",
      },
      {
        title: "Direct communication access during the plan period",
        description: "WhatsApp",
      },
    ],
  },
];
