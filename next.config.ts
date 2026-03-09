import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/parsons-homework',
        destination: 'https://parsons-homework.vercel.app/parsons-homework',
      },
      {
        source: '/parsons-homework/:path*',
        destination: 'https://parsons-homework.vercel.app/parsons-homework/:path*',
      },
    ];
  },
};

export default nextConfig;
