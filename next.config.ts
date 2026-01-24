import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Use custom loader for Cloudflare optimization
    loader: 'custom',
    loaderFile: './lib/cloudflare-loader.ts',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-0b2b9e3ab0ff4761b7390f8e8e5e0286.r2.dev',
      },
    ],
    // Enable modern image formats for better compression
    formats: ['image/avif', 'image/webp'],
    // Optimize for common device sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimize layout shift with longer cache
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache
  },
};

export default nextConfig;
