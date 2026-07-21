import { CreditCard, ImageIcon, Lock, Sparkles, Users, Video } from "lucide-react";

export const FEATURES = [
  {
    title: "AI Image Generation",
    description: "Generate high-quality marketing images from your product and prompt.",
    icon: ImageIcon,
  },
  {
    title: "AI Video Generation",
    description: "Create short promotional videos optimized for social platforms.",
    icon: Video,
  },
  {
    title: "Credit System",
    description: "Only pay for what you generate with transparent credit usage.",
    icon: CreditCard,
  },
  {
    title: "Community Showcase",
    description: "Discover public creations from other creators around the world.",
    icon: Users,
  },
  {
    title: "Private Collections",
    description: "Keep your generated assets organized and under your control.",
    icon: Lock,
  },
  {
    title: "Multiple AI Providers",
    description: "Automatically leverage the best available AI models for every task.",
    icon: Sparkles,
  },
] as const;
