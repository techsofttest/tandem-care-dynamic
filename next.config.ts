import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,

    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "www.techsoftwebsolutions.com",
        port: "",
        pathname: "/techsoft/demo/tandem-care-back/public/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
