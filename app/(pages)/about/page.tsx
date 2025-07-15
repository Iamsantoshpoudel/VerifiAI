import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MarqueeDemo } from "@/components/Marquee";
import { MorphingText } from "@/components/magicui/morphing-text";
import Image from "next/image";
import main from "@/assets/main.png";
import nabin from "@/assets/nabin.jpg";
import devraj from "@/assets/devraj.jpg";
import yamuna from "@/assets/yamuna.jpg"

export default function About() {
  return (
    <>
      <Navbar />
      <section className=" md:block relative top-20 hidden  h-[130vh] w-full overflow-hidden ">
        <div className=" mt-50 md:mt-10 text-center text-2xl font-semibold my-6 ">
          <MorphingText
            texts={["Small Team", "Big Mission", "Protecting The Truth"]}
          />
        </div>
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-0 bg-black rounded-2xl p-2 right-7 w-60 md:w-80 lg:w-80">
            <div className="relative">
              <Image
                src={devraj}
                alt="Devraj Kunwar - Santosh2 Team Member"
                className="rounded-lg "
                priority
                sizes="(max-width: 800px) 160px, (max-width: 1200px) 256px, 320px"
              />
              <div className="absolute bottom-2 left-0 right-0 mx-auto text-center  bg-opacity-90 rounded-lg px-2 py-1 text-xs">
                <p className="navbar rounded-4xl text-black text-2xl font-bold">
                  Devraj Kunwar
                </p>
              </div>
            </div>
          </div>

          {/* Left lamp image */}
          <div className="absolute top-10 left-5  bg-black p-2 rounded-xl md:left-10 lg:left-20 w-36 md:w-56 lg:w-72 ">
            <div className="relative ">
              <Image
                src={main}
                alt="Santosh2 - Santosh Poudel Team Leader"
                className="rounded-xl shadow-xl  "
                priority
                sizes="(max-width: 768px) 144px, (max-width: 1200px) 224px, 288px"
              />
              <div className="absolute bottom-2 left-0 right-0 mx-auto text-center  bg-opacity-90 rounded-lg px-2 py-1 text-xs">
                <p className="navbar rounded-4xl text-black text-2xl font-bold">
                  Santosh Poudel
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
          <div className="absolute top-115 bg-black p-2 rounded-xl  left-30  w-40 md:w-60 lg:w-80">
            <div className="relative   rounded-2xl ">
              <Image
                src={yamuna}
                alt="team member"
                className="w-full rounded-2xl h-auto"
             
                sizes="(max-width: 768px) 160px, (max-width: 1200px) 240px, 320px"
              />
              <div className="absolute bottom-2 left-0 right-0 mx-auto text-center  bg-opacity-90 rounded-lg px-2 py-1 text-xs">
                <p className="navbar rounded-4xl text-black text-2xl font-bold">
                  Yamuna Oli
                </p>
              </div>
            </div>
          </div>

          {/* Bottom-right person image */}
          <div className="absolute top-115 bg-black p-2 rounded-xl  right-25  w-40 md:w-60 lg:w-80">
            <div className="relative   rounded-2xl ">
              <Image
                src={nabin}
                alt="team member"
                className="w-full rounded-2xl h-auto"
                sizes="(max-width: 768px) 160px, (max-width: 1200px) 240px, 320px"
              />
              <div className="absolute bottom-2 left-0 right-0 mx-auto text-center  bg-opacity-90 rounded-lg px-2 py-1 text-xs">
                <p className="navbar rounded-4xl text-black text-2xl font-bold">
                  Nabin Chaudhary
                </p>
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
