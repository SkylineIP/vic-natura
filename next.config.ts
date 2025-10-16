import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // Desativa Strict Mode
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
