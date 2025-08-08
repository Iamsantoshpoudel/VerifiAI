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
    default: "santoshpoudel06 | VerifiAI",
    template: "%s | santoshpoudel06",
  },
  description:
    "santoshpoudel06 (Santosh Poudel) - Official site for VerifiAI, AI content detection, and more. Also visit santoshpoudel06.com.np and GitHub for more projects and information.",
  keywords: [
    "santoshpoudel06, santoshpoudel06.com.np, Santosh Poudel, VerifiAI, AI detector, image detector, fact checker, next js, AI-generated content, santoshpoudel06, santosh poudel, santoshpoudel06 images, santoshpoudel06 profile, santoshpoudel06 projects, santoshpoudel06 ai, santoshpoudel06 verification, santoshpoudel06 team, santoshpoudel06 Nepal, santoshpoudel06 developer, santoshpoudel06 official",
    "santoshpoudel06.com.np, github.com/iamsantoshpoudel",
  ],
  authors: [{ name: "santoshpoudel06", url: "https://santoshpoudel06.com.np" }],
  creator: "santoshpoudel06 (Santosh Poudel)",
  generator: "Next.js",
  metadataBase: new URL("https://santoshpoudel06.com.np"),
  openGraph: {
    title: "santoshpoudel06 | VerifiAI",
    description:
      "santoshpoudel06 (Santosh Poudel) - Official site for VerifiAI, AI content detection, and more. Also visit santoshpoudel06.com.np and GitHub for more projects and information.",
    url: "https://santoshpoudel06.com.np",
    siteName: "santoshpoudel06 | VerifiAI",
    images: [
      {
        url: "/Logo2.svg",
        width: 1200,
        height: 630,
        alt: "santoshpoudel06 Logo",
      },
      {
        url: "/admin/santosh-poudel.jpg",
        width: 800,
        height: 800,
        alt: "santoshpoudel06 Profile Photo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "santoshpoudel06 | VerifiAI",
    description:
      "santoshpoudel06 (Santosh Poudel) - Official site for VerifiAI, AI content detection, and more. Also visit santoshpoudel06.com.np and GitHub for more projects and information.",
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
              name: "santoshpoudel06",
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
                "santoshpoudel06 (Santosh Poudel) is the founder of VerifiAI, specializing in AI-generated content detection and verification. Also runs santoshpoudel06.com.np and GitHub for more projects.",
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
