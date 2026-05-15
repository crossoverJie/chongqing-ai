import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  basePath: '/chongqing-ai',
  assetPrefix: '/chongqing-ai',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
