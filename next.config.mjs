/** @type {import('next').NextConfig} */
// next.config.mjs

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos"], // Add picsum.photos to the allowed domains
  },
};

export default nextConfig;
