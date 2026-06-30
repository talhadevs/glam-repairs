export type MonthlyPoint = {
  month: string;
  value: number;
};

export const monthlyRevenue: MonthlyPoint[] = [
  { month: "Jan", value: 38000 },
  { month: "Feb", value: 45500 },
  { month: "Mar", value: 41000 },
  { month: "Apr", value: 58000 },
  { month: "May", value: 67500 },
  { month: "Jun", value: 74000 },
  { month: "Jul", value: 89590 },
];

export const weeklySignups: MonthlyPoint[] = [
  { month: "W1", value: 6 },
  { month: "W2", value: 9 },
  { month: "W3", value: 7 },
  { month: "W4", value: 12 },
];
