import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
  // next.config.ts
async rewrites() {
  return [
    {
      source: "/api/main/:path*", // আমরা এপিআই এর জন্য একটা নতুন পাথ ধরলাম
      destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/:path*`,
    },
    {
      source: "/api/auth/:path*",
      destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/:path*`,
    },
  ];
},
};

export default nextConfig;
