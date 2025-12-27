import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "AISC | AI x Web Service Development",
  description: "Empowering Future with AI Solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" className="scroll-smooth">
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  );
}

