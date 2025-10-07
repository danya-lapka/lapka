import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   basePath: '/lapka',
  assetPrefix: '/lapka/',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
