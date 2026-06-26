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
    default: "Santosh Poudel | AI Developer & VerifiAI Founder",
    template: "%s | Santosh Poudel | VerifiAI",
  },
  description:
    "Santosh Poudel is the founder of VerifiAI, an AI detection platform for identifying AI-generated text, images, and content. Discover Santosh Poudel's work, profile, and projects.",
  keywords: [
    "Santosh Poudel",
    "santoshpoudel",
    "sant0shpoudel",
    "Santosh Poudel AI",
    "Santosh Poudel VerifiAI",
    "AI developer Nepal",
    "AI content detector",
    "image detector",
    "fact checker",
    "VerifiAI founder",
  ],
  authors: [{ name: "Santosh Poudel", url: "https://santoshpoudel06.com.np" }],
  creator: "Santosh Poudel",
  generator: "Next.js",
  metadataBase: new URL("https://santoshpoudel06.com.np"),
  alternates: {
    canonical: "https://santoshpoudel06.com.np/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Santosh Poudel | AI Developer & VerifiAI Founder",
    description:
      "Santosh Poudel is the founder of VerifiAI, building AI detection tools for text, images, and content verification.",
    url: "https://santoshpoudel06.com.np",
    siteName: "VerifiAI",
    images: [
      {
        url: "/Logo2.svg",
        width: 1200,
        height: 630,
        alt: "Santosh Poudel Logo",
      },
      {
        url: "/admin/santosh-poudel.jpg",
        width: 800,
        height: 800,
        alt: "Santosh Poudel Profile Photo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Santosh Poudel | AI Developer & VerifiAI Founder",
    description:
      "Santosh Poudel is the founder of VerifiAI, building AI detection tools for text, images, and content verification.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "santoshpoudel",
              alternateName: "Santosh Poudel",
              url: "https://santoshpoudel06.com.np",
              image: [
                "https://santoshpoudel06.com.np/admin/santosh-poudel.jpg",
                "https://santoshpoudel06.com.np/Logo2.svg",
              ],
              sameAs: [
                "https://santoshpoudel06.com.np",
                "https://santosh2.com.np",
                "https://github.com/Iamsantoshpoudel",
                "https://www.linkedin.com/in/poudelji/",
              ],
              jobTitle: "AI Developer, Founder of VerifiAI",
              worksFor: {
                "@type": "Organization",
                name: "VerifiAI",
              },
              description:
                "santoshpoudel (Santosh Poudel) is the founder of VerifiAI, specializing in AI-generated content detection and verification. Also runs santoshpoudel06.com.np and GitHub for more projects.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "NP",
              },
            }),
          }}
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
