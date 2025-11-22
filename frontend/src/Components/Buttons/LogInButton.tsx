"use client";
import { motion } from "motion/react";

export default function LogInBtn() {
   return (
      <motion.button
         initial={{ opacity: 0, y: -500 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ type: "spring", duration: 0.5 }}
         whileHover={{
            scale: 1.05,

            transition: { type: "spring", duration: 0.4 },
         }}
         whileTap={{
            scale: 0.9,

            transition: { type: "spring", duration: 0.4 },
         }}
         className="text-white flex items-center justify-between px-5 py-3 bg-accent-500 backdrop-blur-md border
                   border-accent-700/30 rounded-xl shadow-lg active:bg-accent-300"
      >
         <h1 className="text-white ">Log In</h1>
      </motion.button>
   );
}
