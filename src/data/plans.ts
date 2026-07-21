export const PLANS = [
  {
    id: "free",
    name: "Free",
    credits: 20,
    price: "$0",
    duration: "Forever",
    featured: false,
  },
  {
    id: "pro",
    name: "Pro",
    credits: 200,
    price: "$19",
    duration: "1 Month",
    featured: true,
  },
  {
    id: "premium",
    name: "Premium",
    credits: 2000,
    price: "$49",
    duration: "1 Month",
    featured: false,
  },
] as const;
