"use client";
import React, { useState } from "react";
import { Italiana } from "next/font/google";
import Link from "next/link";
import { FaCartArrowDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../cart/redux/store";


const italiana = Italiana({
  weight: "400",
  subsets: ["latin"],
});

const Navbar = () => {
  const item = useSelector((state: RootState) => state.cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#E4D7CA] text-blue-900 body-font shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap p-6 md:p-8 items-center justify-between">
        <span
          className={`text-3xl md:text-5xl font-extrabold tracking-tight cursor-pointer hover:text-blue-600 
          transition duration-300 ${italiana.className}`}
        >
          MY Shop
        </span>

        <button
          className="inline-flex items-center justify-center md:hidden p-2 rounded-md focus:outline-none 
          hover:bg-blue-100 transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6 text-blue-900"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>

        <nav className={`hidden md:flex md:items-center md:space-x-8`}>
          <Link href="/" className="text-lg font-medium hover:text-blue-500">
            Home
          </Link>
          <Link href="/products" className="text-lg font-medium hover:text-blue-500">
            Products
          </Link>
          <Link href="/contact" className="text-lg font-medium hover:text-blue-500">
            Contact
          </Link>
          <Link href="/cart" className="flex items-center gap-2 text-lg font-medium hover:text-blue-500">
            <FaCartArrowDown className="text-xl" />
            Cart ({item.length})
          </Link>
        </nav>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-[#F2E7DA] py-4 px-6 shadow-lg border-t border-gray-300">
          <nav className="flex flex-col space-y-4">
            <Link href="/" className="text-lg font-medium hover:text-blue-500" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link href="/products" className="text-lg font-medium hover:text-blue-500" onClick={() => setIsMenuOpen(false)}>
              Products
            </Link>
            <Link href="/contact" className="text-lg font-medium hover:text-blue-500" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
            <Link href="/cart" className="flex items-center gap-2 text-lg font-medium hover:text-blue-500" onClick={() => setIsMenuOpen(false)}>
              <FaCartArrowDown className="text-xl" />
              Cart ({item.length})
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
