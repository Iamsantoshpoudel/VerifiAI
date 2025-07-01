import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MarqueeDemo } from "@/components/Marquee";
import { MorphingText } from "@/components/magicui/morphing-text";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import image5 from "@/assets/image-5.jpeg";
import image2 from "@/assets/image-2.png";
import image8 from "@/assets/image-8.png";
import image3 from "@/assets/image-3.png";
import image4 from "@/assets/image-4.jpeg";
import {
  MessageCircle,
  Facebook,
  Instagram,
  Linkedin,
  ShoppingCart,
} from "lucide-react";

export default function About() {
  return (
    <>
      <Navbar />
      <section className=" md:block relative top-20 hidden min-h-screen w-full overflow-hidden ">
        <div className=" mt-50 md:mt-10 text-center text-2xl font-semibold my-6 ">
          <MorphingText
            texts={["Develop a website without limits", "With Poudel JS"]}
          />
        </div>
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-60 md:w-80 lg:w-80">
            <div className="relative">
              <Image
                src={image8}
                alt="Building materials"
                className="rounded-lg "
                priority
                sizes="(max-width: 800px) 160px, (max-width: 1200px) 256px, 320px"
              />
            </div>
          </div>

          {/* Left lamp image */}
          <div className="absolute top-10 left-5 md:left-10 lg:left-20 w-36 md:w-56 lg:w-72 ">
            <div className="relative ">
              <Image
                src={image5}
                alt="Stylish lamp"
                className="rounded-xl shadow-xl  "
                priority
                sizes="(max-width: 768px) 144px, (max-width: 1200px) 224px, 288px"
              />
              <div className="absolute bottom-2 left-0 right-0 mx-auto text-center  bg-opacity-90 rounded-lg px-2 py-1 text-xs">
                <p>Nordar Lamp $84.00</p>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center  min-h-screen  px-4 sm:px-6 lg:px-8">
            <div className="m-80 mt-100 p-5 sm:p-10 lg:p-20 text-black dark:bg-black dark:text-white text-center">
              <h1 className="text-2xl">
                Bring your vision to life with the website builder that gives
                you the tools you need to succeed
              </h1>
              <button className=" mt-6 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 ease-in-out">
                🚀 Get Started
              </button>
            </div>
          </div>

          {/* Bottom-left logo */}
          <div className="absolute top-115  left-30  w-40 md:w-60 lg:w-80">
            <div className="relative  p-4 rounded-lg ">
              <Image
                src={image2}
                alt="Logo"
                className="w-full h-auto"
                priority
                sizes="(max-width: 768px) 160px, (max-width: 1200px) 240px, 320px"
              />
            </div>
          </div>

          {/* Bottom-right person image */}
          <div className="absolute bottom-20 right-5 top-80 md:right-10 lg:right-20 w-44 md:w-64 lg:w-80">
            <div className="relative">
              <Image
                src={image3}
                alt="Person with product"
                className="rounded-lg "
                priority
                sizes="(max-width: 768px) 176px, (max-width: 1200px) 256px, 320px"
              />
            </div>
          </div>
        </div>
      </section>
      {/* second section */}
      <section className="bg-[rgb(194,196,254)] container top-15 relative min-h-screen p-4 w-[92%] mx-auto over-flow:hidden rounded-xl m-10">
        {/* Navigation */}
        <header className="absolute flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="text-blue-800">
              <Cog6ToothIcon className="h-8 w-8  text-blue-900 cursor-pointer hover:rotate-45 transition-transform duration-300" />
            </div>
            <nav className="flex gap-6">
              <Link
              href='#'
               className="bg-blue-600 text-white px-4 py-1 rounded-2xl"
              >
                home
              </Link>
              <Link href="#" className="text-blue-800 hover:text-blue-600">
                shop
              </Link>
              <Link href="#" className="text-blue-800 hover:text-blue-600">
                collections
              </Link>
              <Link href="#" className="text-blue-800 hover:text-blue-600">
                blog
              </Link>
              <Link href="#" className="text-blue-800 hover:text-blue-600">
                about
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Facebook size={20} className="text-blue-800" />
            <Instagram size={20} className="text-blue-800" />
            <Linkedin size={20} className="text-blue-800" />
            <div className="flex items-center text-blue-800">
              <ShoppingCart size={20} />
              <span className="ml-1">(1)</span>
            </div>
          </div>
        </header>

        {/* Main Grid Layout */}
        <div className="w-[90%] relative  mx-auto mt-15 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="md:col-span-3 space-y-6">
            {/* Lamp Image */}
            <div className="bg-green-700 rounded-lg overflow-hidden">
              <Image
                src={image5}
                alt="Lamp"
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Brand and CTA */}
            <div className="space-y-4 hidden md:block absolute mt-30">
              <h1 className="text-blue-800 text-4xl font-bold">GRÜN</h1>
              <p className="text-blue-800 text-xl">
                Forward-Thinking Design.
                <br />
                Sustainable Craftsmanship.
              </p>
              <Link
                href="#"
                className="inline-block border-2 border-blue-800 text-blue-800 px-4 py-2 rounded-full hover:bg-blue-800 hover:text-white transition-colors"
              >
                SHOP NEW COLLECTION →
              </Link>
            </div>
          </div>

          {/* Center Column - Hero Image */}
          <div className="md:col-span-6">
            <Image
              src={image4}
              alt="Modern living room with blue furniture"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Right Column */}
          <div className="md:col-span-3 space-y-6">
            {/* Person Image */}
            <div className="bg-orange-400 rounded-lg overflow-hidden">
              <Image
                src={image5}
                alt="Model"
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Designer CTA */}
            <div>
              <h2 className="text-blue-800 hidden md:block text-xl font-medium absolute mt-45">
                Consult With Our
                <br />
                Interior Designers →
              </h2>
            </div>

            {/* Color Swatches */}
            <div className="flex gap-2">
              <div className="bg-yellow-300 w-16 h-16 rounded"></div>
              <div className="bg-green-500 w-16 h-16 rounded"></div>
              <div className="bg-blue-500 w-16 h-16 rounded"></div>
            </div>
          </div>
        </div>

        {/* Chat Buttom*/}
        <div className="absolute  bottom-6 right-10 ">
          <button className="bg-green-600 text-white p-4 rounded-full shadow-lg">
            <MessageCircle size={24} />
          </button>
        </div>
      </section>
      <MarqueeDemo />

      <Footer />

      {/* <Script
        src="https://cdn.botpress.cloud/webchat/v2.4/inject.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://files.bpcontent.cloud/2025/05/03/15/20250503155209-NUKR54K9.js"
        strategy="afterInteractive"
      /> */}
    </>
  );
}
