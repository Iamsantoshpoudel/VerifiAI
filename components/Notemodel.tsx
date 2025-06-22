import React from "react";
import Navbar from "./Navbar";
import { ShinyButton } from "@/components/magicui/shiny-button";
import Link from "next/link";

const Notemodel = () => {
  return (
    <>
      <Navbar />
      <ShinyButton>Shiny Button</ShinyButton>
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          <div className="bg-[#fff] rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-xl text-center text-black">Card 1</h3>
            <p>This is the first card.</p>
            <div className="p-10 text-black">

            <ShinyButton>
              <Link href="/target-page">preview</Link>
            </ShinyButton>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-xl font-semibold">Card 2</h3>
            <p>This is the second card.</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-xl font-semibold">Card 3</h3>
            <p>This is the third card.</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-xl font-semibold">Card 4</h3>
            <p>This is the fourth card.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notemodel;
