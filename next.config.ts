import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  experimental: {
    
  },
  env: {
    PESAPAL_CONSUMER_KEY: process.env.PESAPAL_CONSUMER_KEY,
    PESAPAL_CALLBACK_URL: process.env.PESAPAL_CALLBACK_URL,
  }
};

export default nextConfig;
