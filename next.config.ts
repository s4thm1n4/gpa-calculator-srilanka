import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 compress: true,
  poweredByHeader: false,
  
  // Image optimization for mobile
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Enable experimental features for better mobile performance
  // experimental: {
  //   optimizeCss: true,
 //  }
};

export default nextConfig;
