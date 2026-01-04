import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable static page generation for dynamic Convex routes
  output: undefined,
  experimental: {
    optimizePackageImports: ["convex"],
  },
};

export default nextConfig;
