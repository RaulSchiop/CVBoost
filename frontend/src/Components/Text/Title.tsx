"use client";
import { motion } from "motion/react";
import { ReactNode } from "react";

interface TitleProps {
   title: string;
   children: React.ReactNode;
}

export default function Title({ title, children }: TitleProps) {
   return (
      <div className="flex items-center flex-col justify-center  mt-3 gap-2">
         <motion.h1
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="text-white text-6xl font-bold"
         >
            {title}
         </motion.h1>
         <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="text-white/50"
         >
            {children}
         </motion.div>
      </div>
   );
}
