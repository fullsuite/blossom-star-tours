/** @type {import('next').NextConfig} */
// next.config.mjs

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos", "cdn.sanity.io"], // Add picsum.photos to the allowed domains
  },
};

export default nextConfig;
