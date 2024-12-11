/** @type {import('next').NextConfig} */
// const nextConfig = {};

// module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "homez-appdir.vercel.app",
          pathname: "/_next/image**", // Adjust this based on your image path
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  