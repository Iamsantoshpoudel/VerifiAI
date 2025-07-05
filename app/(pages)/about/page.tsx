import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MarqueeDemo } from "@/components/Marquee";
import { MorphingText } from "@/components/magicui/morphing-text";
import Image from "next/image";
import main from "@/assets/main.png";
import image2 from "@/assets/image-2.png";
import second from "@/assets/second.jpg";
import image3 from "@/assets/image-3.png";

export default function About() {
  return (
    <>
      <Navbar />
      <section className=" md:block relative top-20 hidden min-h-screen w-full overflow-hidden ">
        <div className=" mt-50 md:mt-10 text-center text-2xl font-semibold my-6 ">
          <MorphingText
            texts={["Small Team", "Big Mission", "Protecting The Truth"]}
          />
        </div>
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-0 bg-black rounded-2xl p-2 right-7 w-60 md:w-80 lg:w-80">
            <div className="relative">
              <Image
                src={second}
                alt="Building materials"
                className="rounded-lg "
                priority
                sizes="(max-width: 800px) 160px, (max-width: 1200px) 256px, 320px"
              />
              <div className="absolute bottom-2 left-0 right-0 mx-auto text-center  bg-opacity-90 rounded-lg px-2 py-1 text-xs">
                <p className="navbar rounded-4xl text-black text-2xl font-bold">
                  Devraj kunwar
                </p>
              </div>
            </div>
          </div>

          {/* Left lamp image */}
          <div className="absolute top-10 left-5  bg-black p-2 rounded-xl md:left-10 lg:left-20 w-36 md:w-56 lg:w-72 ">
            <div className="relative ">
              <Image
                src={main}
                alt="Stylish lamp"
                className="rounded-xl shadow-xl  "
                priority
                sizes="(max-width: 768px) 144px, (max-width: 1200px) 224px, 288px"
              />
              <div className="absolute bottom-2 left-0 right-0 mx-auto text-center  bg-opacity-90 rounded-lg px-2 py-1 text-xs">
                <p className="navbar rounded-4xl text-black text-2xl font-bold">
                  Santosh poudel
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center  min-h-screen  px-4 sm:px-6 lg:px-8">
            <div className="m-80 mt-100 p-5 sm:p-10 lg:p-20 text-black dark:bg-black dark:text-white text-center">
              <h1 className="text-2xl font-bold">
                VerifiAI is a small team with a big mission — helping people
                detect AI-generated content across text, images, audio, and
                video.
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
      <div className=" p-20">
        <MarqueeDemo />
      </div>
      <Footer />
    </>
  );
}
