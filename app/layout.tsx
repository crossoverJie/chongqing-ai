import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "渝AI - 重庆人工智能社区",
  description: "渝AI是一个非盈利的AI技术社区，致力于连接重庆AI从业者，推动本地人工智能生态发展",
  keywords: ["渝AI", "重庆AI", "人工智能", "AI社区", "重庆人工智能"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0f] text-slate-100">
        {children}
      </body>
    </html>
  );
}
