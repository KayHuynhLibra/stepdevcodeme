/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Tích hợp vào stepdevcode, build vào /multiverse
  basePath: '/multiverse',
  assetPrefix: '/multiverse/',
  trailingSlash: true,
};

export default nextConfig;

