import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Mode A : HTML/CSS/JS statiques pour o2switch (Apache), sans Node/Passenger
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/wikipedia/commons/**",
      },
    ],
  },
};

export default nextConfig;
