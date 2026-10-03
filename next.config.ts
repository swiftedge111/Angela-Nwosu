import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75],
  },
  // Keep links from the old WordPress site (and search results) working.
  async redirects() {
    return [
      { source: "/product-category/all-collections", destination: "/shop", permanent: true },
      { source: "/product-category/:slug", destination: "/collections/:slug", permanent: true },
      { source: "/checkout", destination: "/cart", permanent: true },
      { source: "/dashboard/:path*", destination: "/", permanent: true },
      { source: "/wishlist", destination: "/shop", permanent: true },
      { source: "/track-order", destination: "/contact", permanent: true },
      { source: "/delivery-and-returns", destination: "/shipping", permanent: true },
    ];
  },
};

export default nextConfig;
