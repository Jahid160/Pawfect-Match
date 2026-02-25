/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co', // ImgBB er direct image host
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com', // Pexels host
      },
    ],
  },
};

export default nextConfig;