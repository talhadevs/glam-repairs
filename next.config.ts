import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  serverExternalPackages: ["pdf-lib"],
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
