import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "admin.tandemcare.com.au",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  async redirects() {
    return [
      {
        // Redirect naked domain to https://www
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "tandemcare.com.au",
          },
        ],
        destination: "https://www.tandemcare.com.au/:path*",
        permanent: true, // 301 Permanent Redirect
      },
      {
        // Redirect http to https://www
        source: "/:path*",
        has: [
          {
            type: "header",
            key: "x-forwarded-proto",
            value: "http",
          },
          {
            type: "host",
            value: "tandemcare.com.au",
          },
        ],
        destination: "https://www.tandemcare.com.au/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
