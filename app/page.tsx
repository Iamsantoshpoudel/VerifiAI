"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import { MorphingText } from "@/components/magicui/morphing-text";
import Card from "@/components/design/Cards";
import { MarqueeDemo } from "@/components/Marquee";
import { PhotoChatMessage } from "@/components/design/PhotoChatMessage";
import Image from "next/image";
import rotate from "../assets/design/1.png";
import sich from "../assets/design/2.png";
import service from "../assets/design/service-2.png";
import service3 from "../assets/design/service-3.png";

export default function Home() {
  return (
    <>
      <Navbar />
      <Section>
        <section className=" h-[60vh]  top-0 flex items-center justify-center relative overflow-hidden ">
          <div className="flex flex-col justify-center items-center text-center w-[92%] max-w-4xl h-[60vh] m-auto overflow-hidden">
            <MorphingText
              className=" absolute  sm:top-0 "
              texts={[
                "Verify Anything Instantly!",
                "Stop AI Fakes Before They Spread",
              ]}
            />
            {/* middle rotating image */}
          </div>
        </section>
        <section className="hidden md:block h-full absolute w-full top-100">
          <div className="relative z-10 grid gap-89 lg:grid-cols-2 justify-end px-8">
            {/* Left Card */}
            <div className="relative w-full max-w-md min-h-[32rem] border border-n-1/10 rounded-3xl overflow-hidden">
              <div className="absolute inset-0">
                <Image
                  src={service.src}
                  className="h-full w-full object-cover"
                  width={630}
                  height={750}
                  alt="robot"
                  priority
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-b from-n-8/0 to-n-8/90 lg:p-10">
                <h4 className="h4 mb-4">Photo Detector</h4>
                <p className="body-2 mb-12 text-n-3 navbar rounded p-2 text-black">
                  Instantly analyze any image to determine if it was created by
                  AI or edited with AI tools. Protect your content integrity
                </p>
              </div>
              <PhotoChatMessage
                className="rounded-bl-xl"
                massage="Hey,Detect Fake or AI-Generated Images"
              />
            </div>

            {/* Right Card */}
            <div className="relative w-full max-w-md min-h-[32rem] border border-n-1/10 rounded-3xl overflow-hidden">
              <div className="absolute inset-0">
                <Image
                  src={service3.src}
                  className="h-full w-full object-cover"
                  width={630}
                  height={750}
                  alt="robot-2"
                  priority
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white bg-gradient-to-b from-n-8/0 to-n-8/90 lg:p-10">
                <h4 className="h4 mb-4">AI Content Detector</h4>
                <p className=" mb-12 text-n-3 navbar text-black rounded p-2">
                  Upload or paste text or image to check if it&apos;s written by
                  AI models like ChatGPT, Gemini, or Claude. Ideal for
                  educators, employers, and journalists.
                </p>
                <PhotoChatMessage
                  className=" rounded-br-xl"
                  massage="Hey ,Can you Identify AI or Real "
                />
              </div>
            </div>
          </div>
        </section>
        <div className="w-full h-[55vh] flex items-center justify-center md:pt-10 mt-[-40] text-white px-4">
          <div
            className="relative grid grid-cols-6 gap-4 sm:gap-8 w-full max-w-4xl"
            style={{ gridTemplateRows: "repeat(2, 100px)" }}
          >
            <figure className="col-start-1 col-end-[-1] md:col-start-2 md:col-end-6 row-start-1 z-0">
              <Image
                src={sich}
                alt="back sich"
                className="w-full h-auto object-contain scale-110 md:scale-100"
                loading="lazy"
              />
            </figure>

            <figure className="col-start-1 col-end-[-1] md:col-start-3 md:col-end-5 row-start-1 z-10 ">
              <Image
                src={rotate}
                alt="rotating"
                className="w-full h-auto object-contain roshan"
                loading="lazy"
              />
            </figure>
          </div>
        </div>
        <Card />
      </Section>

      <MarqueeDemo />
      <Footer />
    </>
  );
}
