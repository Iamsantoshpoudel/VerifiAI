import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MarqueeDemo } from "@/components/magicui/MarqueDemo";
import { MorphingText } from "@/components/magicui/morphing-text";
import Image from "next/image";


import design from "@/assets/design/design.webp";

export const metadata: Metadata = {
  title: "About Santosh Poudel",
  description:
    "Learn more about Santosh Poudel, the founder of VerifiAI, and his work in AI detection, content verification, and digital trust.",
  keywords: [
    "About Santosh Poudel",
    "Santosh Poudel profile",
    "santoshpoudel",
    "sant0shpoudel",
    "VerifiAI founder",
  ],
};

export default function About() {
  return (
    <>
      <Navbar />
      <main className="relative top-10 flex justify-center items-center w-full h-screen md:hidden">
        <Image
          src={design}
          alt="Design image"
          fill
          className="object-contain"
          priority
        />
      </main>

      <section className=" md:block relative top-20 hidden  h-[130vh] w-full overflow-hidden ">
        <div className=" mt-50 md:mt-10 text-center text-2xl font-semibold my-6 ">
          <MorphingText
            texts={["Small Team", "Big Mission", "Protecting The Truth"]}
          />
        </div>
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-0  rounded-2xl p-2 right-7 w-60 md:w-80 lg:w-80">
            <div className="relative">
              <Image
                src="/admin/santosh-poudel.jpg"
                alt="Santosh2 - Santosh Poudel Team Leader"
                className="rounded-xl shadow-xl  "
                priority
                sizes="(max-width: 768px) 144px, (max-width: 1200px) 224px, 288px"
                width={288}
                height={288}
              />
              <div className="absolute bottom-2 left-0 right-0 mx-auto text-center  bg-opacity-90 rounded-lg px-2 py-1 text-xs">
                <p className="navbar rounded-4xl text-black text-2xl font-bold hidden">Santosh Poudel</p>
              </div>
            </div>
          </div>

          {/* Left lamp image */}
          <div className="absolute top-10 left-5   p-2 rounded-xl md:left-10 lg:left-20 w-36 md:w-56 lg:w-72 ">
            <div className="relative ">
              <Image
                src="/admin/santoshPoudel.jpeg"
                alt="Santosh2 - Santosh Poudel Team Leader"
                className="rounded-xl shadow-xl  "
                priority
                sizes="(max-width: 768px) 144px, (max-width: 1200px) 224px, 288px"
                width={288}
                height={288}
              />
              <div className="absolute bottom-2 left-0 right-0 mx-auto text-center  bg-opacity-90 rounded-lg px-2 py-1 text-xs">
                <p className="navbar hidden rounded-4xl text-black text-2xl font-bold">
                  Santosh Poudel
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center  min-h-screen  px-4 sm:px-6 lg:px-8">
            <div className="m-80 mt-100 p-5 sm:p-10 lg:p-20 text-black dark:bg-black dark:text-white text-center">
              <h1 className="text-2xl font-bold">
                Santosh Poudel is the founder of VerifiAI, building tools that help people verify AI-generated content across text, images, audio, and video.
              </h1>
              <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
                Santosh Poudel is also known as santoshpoudel and sant0shpoudel in online searches, and this profile focuses on his work, projects, and digital presence.
              </p>
              <button className=" mt-6 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 ease-in-out">
                🚀 Get Started
              </button>
            </div>
          </div>

          {/* Bottom-left logo */}
          <div className="absolute top-115   rounded-xl  left-20  w-40 md:w-60 lg:w-80">
            <div className="relative   rounded-2xl ">
              <Image
                src="/admin/Santoshp.JPG"
                alt="Santosh2 - Santosh Poudel Team Leader"
                className="rounded-xl shadow-xl  "
                priority
                sizes="(max-width: 768px) 144px, (max-width: 1200px) 224px, 288px"
                width={288}
                height={288}
              />
              <div className="absolute bottom-2 left-0 right-0 mx-auto text-center  bg-opacity-90 rounded-lg px-2 py-1 text-xs">
                <p className="navbar hidden rounded-4xl text-black text-2xl font-bold">
                  Santosh Poudel
                </p>
              </div>
            </div>
          </div>

          {/* Bottom-right person image */}
          <div className="absolute top-125 mt-15  p-2 rounded-xl  right-25  w-40 md:w-60 lg:w-80">
            <div className="relative   rounded-2xl ">
              <Image
                src="/admin/Santosh.JPG"
                alt="Santosh2 - Santosh Poudel Team Leader"
                className="rounded-xl shadow-xl  "
                priority
                sizes="(max-width: 768px) 144px, (max-width: 1200px) 224px, 288px"
                width={288}
                height={288}
              />
              <div className="absolute bottom-2 left-0 right-0 mx-auto text-center  bg-opacity-90 rounded-lg px-2 py-1 text-xs">
                <p className="navbar hidden rounded-4xl text-black text-2xl font-bold">Santosh Poudel</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="p-20">
        <MarqueeDemo />
      </div>
      <Footer />
    </>
  );
}
