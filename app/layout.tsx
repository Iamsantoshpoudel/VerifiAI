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
  title: {
    default: "Next js with poudel",
    template: "%s | Poudel js",
  },
  description: "Next js with poudel ",
  keywords: [
    "Next js ",
  ],
  authors: [{ name: "Poudel", url: "https://santoshpoudel.com.np" }],
  creator: "Poudel",
  generator: "Next.js",
  metadataBase: new URL("https://santoshpoudel.com.np"),
  openGraph: {
    title: "Poudel ",
    description: "Next js with poudel",
    url: "https://santoshpoudel.com.np",
    siteName: "Poudel",
    images: [
      {
        url: "/Logo.svg",
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
    title: "Poudel Solutions",
    description: "Poudel",
    creator: "@poudel", // Replace if you have a Twitter handle
    images: ["/Logo.svg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
      </body>
    </html>
  );
}
