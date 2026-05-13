/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.scdn.co', 'images.unsplash.com', 'avatars.githubusercontent.com'],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
