import { resolveSiteConfig } from "./lib/site.mjs";

const { basePath } = resolveSiteConfig(process.env);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // The default lives in lib/site.mjs. Set SITE_BASE_PATH=/ only for a coordinated root migration (see README).
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
