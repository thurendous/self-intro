/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If your repo name is NOT <username>.github.io, uncomment the line below and set it to your repo name
  // basePath: '/self-intro', 
};

export default nextConfig;
