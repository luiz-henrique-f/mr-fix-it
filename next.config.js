/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "lh3.googleusercontent.com",
          port: "",
        },
        {
          protocol: "https",
          hostname: "images.unsplash.com",
          port: "",
        },
        {
          protocol: "https",
          hostname: "files.edgestore.dev",
          port: "",
        },
      ],
    },
  };
  
  module.exports = nextConfig;