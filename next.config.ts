import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
  },
};

export default nextConfig;
