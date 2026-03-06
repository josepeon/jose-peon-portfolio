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
  title: "Jose Peon",
  description: "AI Engineer - Portfolio",
  metadataBase: new URL('https://josepeon.co'),
  openGraph: {
    title: 'Jose Peon',
    description: 'AI Engineer - Portfolio',
    url: 'https://josepeon.co',
    siteName: 'Jose Peon',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Jose Peon - AI Engineer',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jose Peon',
    description: 'AI Engineer - Portfolio',
    images: ['/og-image.png'],
  },
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
