import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Santosh Poudel | AI Developer, VerifiAI Founder",
  description:
    "Santosh Poudel is the founder of VerifiAI, building AI detection tools and content verification systems for creators, businesses, and educators.",
  keywords: [
    "Santosh Poudel",
    "santoshpoudel",
    "sant0shpoudel",
    "Santosh Poudel AI",
    "Santosh Poudel VerifiAI",
    "AI developer Nepal",
  ],
};

const profileImages = [
  {
    src: "/admin/santosh-poudel.jpg",
    alt: "Santosh Poudel profile photo",
  },
  {
    src: "/admin/santoshPoudel.jpeg",
    alt: "Santosh Poudel another profile image",
  },
  {
    src: "/admin/Santoshpoudel.jpg",
    alt: "Santosh Poudel portrait",
  },
  {
    src: "/admin/Santosh.JPG",
    alt: "Santosh Poudel portrait in natural light",
  },
  {
    src: "/admin/santoshp.JPG",
    alt: "Santosh Poudel close-up profile",
  },
];

export default function SantoshPoudelPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white px-4 py-20 text-black sm:px-6 lg:px-8 dark:bg-black dark:text-white">
        <section className="mx-auto flex max-w-6xl flex-col gap-12">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
                Santosh Poudel
              </p>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
                Santosh Poudel is the founder of VerifiAI and a developer building AI detection tools for a more trustworthy digital world.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-700 dark:text-gray-300">
                People often search for Santosh Poudel as santoshpoudel, sant0shpoudel, or similar variants. This page is designed to help Google and visitors understand who Santosh Poudel is, what he builds, and why his work matters.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/about" className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
                  About VerifiAI
                </a>
                <a href="/detect" className="rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-800 transition hover:border-blue-600 hover:text-blue-600 dark:border-gray-700 dark:text-gray-200">
                  Try the Detector
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-gray-200 shadow-sm dark:border-gray-800">
              <Image
                src="/admin/santosh-poudel.jpg"
                alt="Santosh Poudel profile photo"
                width={900}
                height={900}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>

          <article className="rounded-3xl border border-gray-200 bg-gray-50 p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h2 className="text-3xl font-semibold">About Santosh Poudel</h2>
            <p className="mt-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
              Santosh Poudel is known online as santoshpoudel and sometimes sant0shpoudel, but the real identity behind the name is a developer, builder, and founder focused on AI verification and online trust. He works at the intersection of technology, content authenticity, and user safety.
            </p>
            <p className="mt-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
              Through VerifiAI, Santosh Poudel builds tools that help people detect AI-generated text, images, and other synthetic content. His mission is to make digital content easier to verify, especially in a time when AI-generated media is becoming more common.
            </p>
          </article>

          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-gray-200 p-6 shadow-sm dark:border-gray-800">
              <h2 className="text-2xl font-semibold">Who is Santosh Poudel?</h2>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                Santosh Poudel is an AI developer and founder of VerifiAI, a platform designed to help individuals and organizations identify AI-generated content, detect manipulated media, and verify digital trust.
              </p>
            </article>
            <article className="rounded-2xl border border-gray-200 p-6 shadow-sm dark:border-gray-800">
              <h2 className="text-2xl font-semibold">What does Santosh Poudel work on?</h2>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                His work includes AI content detection, image verification, developer tools, and digital platforms that make online content safer and easier to understand for creators, educators, journalists, and businesses.
              </p>
            </article>
          </div>

          <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-black">
            <h2 className="text-3xl font-semibold">Santosh Poudel and VerifiAI</h2>
            <p className="mt-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
              VerifiAI was created to support the growing need for trustworthy AI detection and media verification. Santosh Poudel’s focus is on building practical tools that make it easier for people to understand whether content is human-made or AI-generated.
            </p>
            <p className="mt-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
              This makes the name Santosh Poudel relevant not only as a personal identity, but also as a recognizable figure in the AI detection and digital verification space.
            </p>
          </section>

          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {profileImages.map((image) => (
              <div key={image.src} className="overflow-hidden rounded-3xl border border-gray-200 shadow-sm dark:border-gray-800">
                <Image src={image.src} alt={image.alt} width={900} height={900} className="h-80 w-full object-cover" />
              </div>
            ))}
          </section>

          <section className="rounded-3xl bg-gray-50 p-8 dark:bg-gray-900">
            <h2 className="text-2xl font-semibold">Common name searches</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-300">
              <li>Santosh Poudel</li>
              <li>santoshpoudel</li>
              <li>sant0shpoudel</li>
              <li>Santosh Poudel AI</li>
              <li>Santosh Poudel VerifiAI</li>
              <li>Santosh Poudel developer</li>
            </ul>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}
