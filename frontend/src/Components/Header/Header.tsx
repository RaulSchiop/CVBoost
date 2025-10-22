"use client";
import LogInBtn from "../Buttons/LogInButton";
import Logo from "../Logo/Logo";
import Link from "next/link";
import { motion } from "motion/react";

export default function Header() {
   return (
      <motion.div
         initial={{ opacity: 0, y: -500 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ type: "spring", duration: 0.5 }}
         className="fixed top-5 w-full h-16 flex items-center justify-between px-15 z-50 "
      >
         <Logo></Logo>
         <div
            className="text-white flex items-center justify-between 
    bg-purple-500/25 backdrop-blur-md border border-purple-300/30 
    px-5 py-3 w-[50%] rounded-2xl shadow-lg"
         >
            <Link
               className="transition-all duration-300
                       hover:text-accent-800 hover:bg-accent-100
                    active:bg-accent-950 active:text-accent-200 active:scale-90
                       hover:px-3 hover:py-2 hover:rounded-xl
                       transform hover:scale-110"
               href="/"
            >
               Home
            </Link>
            <Link
               className="transition-all duration-300
                       hover:text-accent-800 hover:bg-accent-100
                    active:bg-accent-950 active:text-accent-200 active:scale-90
                       hover:px-3 hover:py-2 hover:rounded-xl
                       transform hover:scale-110"
               href="/tools"
            >
               Tools
            </Link>
            <Link
               className="transition-all duration-300
                       hover:text-accent-800 hover:bg-accent-100
                    active:bg-accent-950 active:text-accent-200 active:scale-90
                       hover:px-3 hover:py-2 hover:rounded-xl
                       transform hover:scale-110"
               href="/contact"
            >
               Contact
            </Link>
            <Link
               className="transition-all duration-300
                       hover:text-accent-800 hover:bg-accent-100
                    active:bg-accent-950 active:text-accent-200 active:scale-90
                       hover:px-3 hover:py-2 hover:rounded-xl
                       transform hover:scale-110"
               href="/profile"
            >
               Profile
            </Link>
         </div>
         <Link href="/auth">
            <LogInBtn></LogInBtn>
         </Link>
      </motion.div>
   );
}
