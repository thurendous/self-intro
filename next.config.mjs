/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // 如果你的仓库名是 <username>.github.io，注释掉下面这行
  // 如果你的仓库名是其他名字（如 self-intro），取消注释并设置为你的仓库名
  basePath: '/self-intro',
};

export default nextConfig;
