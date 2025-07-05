import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "VerifiAI",
    template: "%s | VerifiAI",
  },
  description: "VerifiAI | Unified Ai Generated Content Detector ",
  keywords: [
    "santoshpoudel06 , ai detecctor,rec,image dector,fact checker,poudel,next js",
  ],
  authors: [{ name: "VerifiAI", url: "https://santosh2.com.np" }],
  creator: "Poudel",
  generator: "Next.js",
  metadataBase: new URL("https://santosh2.com.np"),
  openGraph: {
    title: "VerifiAi",
    description: "VerifiAI | Unified Ai Generated Content Detector",
    url: "https://santosh2.com.np",
    siteName: "VerifiAI",
    images: [
      {
        url: "/Logo2.svg",
        width: 1200,
        height: 630,
        alt: "Poudel",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VerifiAi",
    description: "VerifiAI | Unified Ai Generated Content Detector",
    creator: "@poudelji", // Replace if you have a Twitter handle
    images: ["/Logo2.svg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo2.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
