import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Sidebar from "./components/Sidebars/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "리소스 대시보드",
  description: "리소스 데이터를 시각화하는 Next.js 기반 대시보드",
  verification: {
    google: "lfUFCPYeSMM84AxR75MmurPWqk5Dp5fxXXogK6czTLA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-blueGray-100 ${geistSans.variable} ${geistMono.variable} antialiased h-screen`}
      >
        <Sidebar />
        <main className="wide:h-[min(900px, 100vh)] wide:max-h-[min(900px, 100vh)] relative md:ml-64 px-4 md:px-4 lg:px-6 md:py-6 py-8 mt-12 md:mt-0 max-w-[1440px] mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
