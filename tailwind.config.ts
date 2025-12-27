import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#fafafa',        // 浅灰色背景，比纯白更有质感
        'brand-surface': '#ffffff',   // 纯白卡片表面
        'brand-border': '#e5e5e5',    // 细腻的边框
        'brand-muted': '#737373',     // 辅助文字颜色
        'brand-primary': '#000000',   // 主要文字/按钮
        'brand-accent': '#3b82f6',    // 区块链常用的科技蓝，作为强调色
      },
      fontFamily: {
        sans: ['Inter', 'var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
