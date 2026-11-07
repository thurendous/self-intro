import { resolveSiteConfig } from "./lib/site.mjs";

const { basePath } = resolveSiteConfig(process.env);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // The default lives in lib/site.mjs. Production sets SITE_BASE_PATH=/ in the deploy workflow (see README).
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
