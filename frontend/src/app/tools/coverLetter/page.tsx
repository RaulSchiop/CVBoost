"use client";
import { motion } from "motion/react";

export default function CoverLetter() {
   return (
      <div className="w-full h-full p-10 md:p-15 bg-gradient-to-bl from-contrast-500/20 via-contrast-500/60 to-contrast-500/20">
         <div className="flex items-center flex-col justify-center mb-10 mt-3 gap-2">
            {/* page text */}
            <motion.h1
               initial={{ opacity: 0, y: -100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ type: "spring", duration: 0.6 }}
               className="text-white text-5xl font-bold"
            >
               Cover Letters
            </motion.h1>
            <motion.p
               initial={{ opacity: 0, y: -100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ type: "spring", duration: 0.4 }}
               className="text-white/50"
            >
               View all your cover letters or create new ones.
            </motion.p>
         </div>
      </div>
   );
}
