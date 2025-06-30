"use client"
import React, { useState } from 'react';


const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        /* Glassmorphism style for navbar background */
        .glass-bg {
          background: rgba(255 255 255 / 0.12);
          backdrop-filter: saturate(180%) blur(20px);
          -webkit-backdrop-filter: saturate(180%) blur(20px);
          border-radius: 12px;
          border: 1px solid rgba(255 255 255 / 0.18);
        }
      `}</style>

      <nav className="w-full flex items-center justify-between p-4 md:px-8 bg-[#f5f7fa] bg-opacity-20 glass-bg fixed top-0 left-0 z-50">
        {/* Logo */}
        <div className="text-xl font-bold select-none cursor-default text-black">
          LUSION
        </div>

        {/* Right Buttons */}
        <div className="flex items-center space-x-4">
          {/* Icon Button */}
          <button
            aria-label="Wave Icon Button"
            className="w-10 h-10 bg-white bg-opacity-30 glass-bg rounded-full flex items-center justify-center hover:bg-opacity-50 transition"
            type="button"
          >
            <svg
              className="w-6 h-6 text-black opacity-70"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M2 12h4l2 8 4-16 2 8h4" />
            </svg>
          </button>

          {/* LET'S TALK Button */}
          <button
            type="button"
            className="px-5 py-2 rounded-full bg-black bg-opacity-90 text-white text-sm font-semibold flex items-center space-x-2 hover:bg-opacity-100 transition"
          >
            <span>LET&apos;S TALK</span>
            <span className="w-2 h-2 rounded-full bg-white" />
          </button>

          {/* MENU Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="px-5 py-2 rounded-full bg-white bg-opacity-50 glass-bg text-black text-sm font-semibold flex items-center space-x-2 hover:bg-opacity-70 transition"
            aria-expanded={menuOpen}
            aria-controls="menu-list"
          >
            <span>MENU</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <circle cx="5" cy="12" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="19" cy="12" r="1.5" />
            </svg>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Nav;

