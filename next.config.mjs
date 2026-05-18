/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    serverActions: {
      ppr: {
        mode: "incremental",
      },
      bodySizeLimit: "30mb",
    },
  },
  // webpack: (config, { dev, isServer }) => {
  //   if (dev && !isServer) {
  //     config.watchOptions = {
  //       poll: 1000,
  //       aggregateTimeout: 300,
  //     };
  //   }
  //   return config;
  // },
};

export default nextConfig;
