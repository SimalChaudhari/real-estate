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
        {
          protocol: "https",
          hostname: "storage.googleapis.com",
          pathname: "/b2b-vendor-76300.appspot.com/**", // Adjust this based on your image path
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  