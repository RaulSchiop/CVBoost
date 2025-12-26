"use client";
import { motion } from "motion/react";
import Link from "next/link";

export default function CreateCoverLetter() {
   return (
      <div className="w-full min-h-screen p-10 md:p-15 bg-gradient-to-bl from-contrast-500/20 via-contrast-500/60 to-contrast-500/20">
         <div className="flex items-center flex-col justify-center mb-10 mt-3 gap-2">
            <motion.h1
               initial={{ opacity: 0, y: -100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ type: "spring", duration: 0.6 }}
               className="text-white text-5xl font-bold"
            >
               Create Cover Letters
            </motion.h1>
            <motion.p
               initial={{ opacity: 0, y: -100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ type: "spring", duration: 0.4 }}
               className="text-white/50"
            >
               Fill in inputs and create a new cover letter built by {" "}
               <a className="text-accent-500 text-xl font-bold">AI</a>
            </motion.p>
         </div>
         {/* stap 1 */}
         {/* upload a job description,job title and a cv to know the person */}

         {/* stap 2 */}
         {/* based on the cv ( that person ) and job description and title create a cover letter ( create a txt file and download it) */}
      </div>
   );
}
