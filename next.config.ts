import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ["https://elenora-lovable-tragically.ngrok-free.dev/api/webhooks/clerk"],
};

export default nextConfig;
