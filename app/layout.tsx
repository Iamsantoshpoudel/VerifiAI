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
    default: "Santosh2 | VerifiAI",
    template: "%s | Santosh2",
  },
  description: "Santosh2 (Santosh Poudel) - Official site for VerifiAI, AI content detection, and more. Also visit santoshpoudel06.com.np and GitHub for more projects and information.",
  keywords: [
    "santosh2, santosh2.com.np, Santosh Poudel, VerifiAI, AI detector, image detector, fact checker, next js, AI-generated content, santoshpoudel06, santosh poudel, santosh2 images, santosh2 profile, santosh2 projects, santosh2 ai, santosh2 verification, santosh2 team, santosh2 Nepal, santosh2 developer, santosh2 official",
    "santoshpoudel06.com.np, github.com/iamsantoshpoudel"
  ],
  authors: [{ name: "Santosh2", url: "https://santosh2.com.np" }],
  creator: "Santosh2 (Santosh Poudel)",
  generator: "Next.js",
  metadataBase: new URL("https://santosh2.com.np"),
  openGraph: {
    title: "Santosh2 | VerifiAI",
    description: "Santosh2 (Santosh Poudel) - Official site for VerifiAI, AI content detection, and more. Also visit santoshpoudel06.com.np and GitHub for more projects and information.",
    url: "https://santosh2.com.np",
    siteName: "Santosh2 | VerifiAI",
    images: [
      {
        url: "/Logo2.svg",
        width: 1200,
        height: 630,
        alt: "Santosh2 Logo",
      },
      {
        url: "/admin/santosh-poudel.jpg",
        width: 800,
        height: 800,
        alt: "Santosh2 Profile Photo",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Santosh2 | VerifiAI",
    description: "Santosh2 (Santosh Poudel) - Official site for VerifiAI, AI content detection, and more. Also visit santoshpoudel06.com.np and GitHub for more projects and information.",
    creator: "@poudelji",
    images: ["/Logo2.svg", "/admin/santosh-poudel.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/Logo2.svg",
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
        {/* Structured Data for SEO */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Santosh2",
            "alternateName": "Santosh Poudel",
            "url": "https://santosh2.com.np",
            "image": [
              "https://santosh2.com.np/admin/santosh-poudel.jpg",
              "https://santosh2.com.np/Logo2.svg"
            ],
            "sameAs": [
              "https://santosh2.com.np",
              "https://santoshpoudel06.com.np",
              "https://github.com/Iamsantoshpoudel",
              "https://www.linkedin.com/in/poudelji/"
            ],
            "jobTitle": "AI Developer, Founder of VerifiAI",
            "worksFor": {
              "@type": "Organization",
              "name": "VerifiAI"
            },
            "description": "Santosh2 (Santosh Poudel) is the founder of VerifiAI, specializing in AI-generated content detection and verification. Also runs santoshpoudel06.com.np and GitHub for more projects.",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "NP"
            }
          })
        }} />
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