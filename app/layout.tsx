import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import GlobalCursor from "@/components/GlobalCursor";
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
  title: "Project Showcase",
  description: "A showcase of amazing projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="cursor-none">
      <head>
        <style dangerouslySetInnerHTML={{ __html: '*, *::before, *::after, html, body { cursor: none !important; }' }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased cursor-none`}
        suppressHydrationWarning
      >
        {children}
        <GlobalCursor />
      </body>
    </html>
  );
}
