"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import { MorphingText } from "@/components/magicui/morphing-text";
import Image from "next/image";
import rotate from "../assets/design/1.png";
import sich from "../assets/design/2.png";

export default function Home() {
  return (
    <>
      <Navbar />
      <Section>
        <section className=" h-[60vh]  top-0 flex items-center justify-center relative overflow-hidden ">
          <div className="flex flex-col justify-center items-center text-center w-[92%] max-w-4xl h-[60vh] m-auto overflow-hidden">
            <MorphingText
              className=" absolute top-32 sm:top-0 "
              texts={[
                "Verify Anything Instantly!",
                "Stop AI Fakes Before They Spread",
              ]}
            />
            {/* middle rotating image */}
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
      </Section>
      <Footer />
    </>
  );
}
