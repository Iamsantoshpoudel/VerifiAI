"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Handle clicks outside of the menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="bg-black  w-[92%] m-auto my-6 p-4 rounded-t-2xl md:rounded-2xl text-black dark:bg-black dark:text-white">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl">Poudel</h1>

          {/* Mobile menu button */}
          <button
            ref={buttonRef}
            className="text-white md:hidden text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          {/* Desktop Menu */}
          <nav className="hidden md:block">
            <ul className="flex gap-12 text-white text-xl cursor-pointer">
              <li className="hover:underline">
                <Link href="/">Home</Link>
              </li>
              <li className="hover:underline">
                <Link href="/about">About</Link>
              </li>
              <li className="hover:underline">
                <Link href="/note">Community</Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div ref={menuRef}>
            <nav
              className="absolute bg-black rounded-2xl rounded-t-none md:hidden z-50 w-[20%] left-0 mt-4"
              style={{
                width: "calc(100% - 2rem)",
                marginLeft: "1rem",
                marginRight: "1rem",
              }}
            >
              <ul className="flex flex-col gap-4 p-4 text-white text-xl">
                <li>
                  <Link
                    href="https://cdn.botpress.cloud/webchat/v2.5/shareable.html?configUrl=https://files.bpcontent.cloud/2025/05/03/15/20250503155210-ZH6Y3LBH.json"
                    onClick={() => setMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/contact" onClick={() => setMenuOpen(false)}>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/note" onClick={() => setMenuOpen(false)}>
                    Community
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
