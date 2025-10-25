"use client";
import LogInBtn from "../Buttons/LogInButton";
import Logo from "../Logo/Logo";
import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";

export default function Header() {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   return (
      <motion.div
         initial={{ opacity: 0, y: -500 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ type: "spring", duration: 0.5 }}
         className="fixed top-5 w-full h-16 flex items-center justify-between px-25 z-50"
      >
         <Logo></Logo>

         <div className="text-white hidden md:flex items-center justify-between bg-purple-500/25 backdrop-blur-md border border-purple-300/30 px-5 py-3 w-[50%] rounded-2xl shadow-lg">
            <Link
               className="transition-all duration-300 hover:text-accent-800 hover:bg-accent-100 active:bg-accent-950 active:text-accent-200 active:scale-90 hover:px-3 hover:py-2 hover:rounded-xl transform hover:scale-110"
               href="/"
            >
               Home
            </Link>
            <Link
               className="transition-all duration-300 hover:text-accent-800 hover:bg-accent-100 active:bg-accent-950 active:text-accent-200 active:scale-90 hover:px-3 hover:py-2 hover:rounded-xl transform hover:scale-110"
               href="/tools"
            >
               Tools
            </Link>
            <Link
               className="transition-all duration-300 hover:text-accent-800 hover:bg-accent-100 active:bg-accent-950 active:text-accent-200 active:scale-90 hover:px-3 hover:py-2 hover:rounded-xl transform hover:scale-110"
               href="/contact"
            >
               Contact
            </Link>
            <Link
               className="transition-all duration-300 hover:text-accent-800 hover:bg-accent-100 active:bg-accent-950 active:text-accent-200 active:scale-90 hover:px-3 hover:py-2 hover:rounded-xl transform hover:scale-110"
               href="/profile"
            >
               Profile
            </Link>
         </div>
         <div className="flex items-center gap-4">
            <button
               onClick={() => setIsMenuOpen(!isMenuOpen)}
               className="md:hidden p-2 rounded-lg text-white hover:bg-purple-500/20"
               aria-label="Toggle menu"
            >
               <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
               >
                  {isMenuOpen ? (
                     <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                     <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
               </svg>
            </button>
            <Link href="/auth">
               <LogInBtn></LogInBtn>
            </Link>
         </div>

         {isMenuOpen && (
            <motion.div
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="fixed top-[100px] left-4 right-4 p-4  bg-purple-500/25 backdrop-blur-lg md:hidden z-40 rounded-2xl border border-purple-300/30 shadow-lg"
            >
               <div className="text-white flex flex-col items-center justify-center w-full gap-5 bg-purple-500/25 backdrop-blur-md border border-purple-300/30 px-5 py-3  rounded-2xl shadow-lg">
                  <Link
                     className=" border-b-2 active:text-accent-200 "
                     href="/"
                     onClick={() => setIsMenuOpen(false)}
                  >
                     Home
                  </Link>
                  <Link
                     className=" border-b-2 active:text-accent-200 "
                     href="/tools"
                     onClick={() => setIsMenuOpen(false)}
                  >
                     Tools
                  </Link>
                  <Link
                     className=" border-b-2 active:text-accent-200 "
                     href="/contact"
                     onClick={() => setIsMenuOpen(false)}
                  >
                     Contact
                  </Link>
                  <Link
                     className=" border-b-2 active:text-accent-200 "
                     href="/profile"
                     onClick={() => setIsMenuOpen(false)}
                  >
                     Profile
                  </Link>
               </div>
            </motion.div>
         )}
      </motion.div>
   );
}
