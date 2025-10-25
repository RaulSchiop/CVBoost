"use client";
import Link from "next/link";
import { motion } from "motion/react";
import MainBtn from "@/Components/Buttons/MainBtn";

export default function Notfound() {
   return (
      <div className="h-screen w-screen flex items-center justify-center ">
         <div>
            <motion.p
               initial={{ opacity: 0, x: -1000 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 1, type: "spring" }}
               className="text-accent-400 text-6xl font-bold"
            >
               404
            </motion.p>
            <motion.h1
               initial={{ opacity: 0, x: 1000 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 1, type: "spring" }}
               className="text-5xl text-accent-900 font-bold"
            >
               Page not found
            </motion.h1>
            <motion.p
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 4 }}
               className="text-accent-900 mt-1"
            >
               Sorry, we couldn't find the page you're looking for.
            </motion.p>
            <Link href={"/"}>
               <motion.div
                  initial={{ opacity: 0, x: -1000 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", duration: 1 }}
                  className="mt-5"
               >
                  <MainBtn> Go back home</MainBtn>
               </motion.div>
            </Link>
         </div>
      </div>
   );
}
